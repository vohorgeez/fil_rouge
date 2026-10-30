import { describe, expect, it } from 'vitest';
import { Attempt, type LessonToAttempt } from '../../../src/learning/domain/Attempt.js';
import {
    AttemptAlreadyCompleted,
    InsufficientLevel,
    LessonNotPublished,
    OptionNotInQuestion,
    QuestionAlreadyAnswered,
    QuestionNotInLesson,
} from '../../../src/learning/domain/errors.js';
import { LearnerId, LessonId, OptionId, QuestionId } from '../../../src/learning/domain/ids.js';

// A lesson with 4 questions : each question has options a, b, c ; right one is a.
const q = (n: number) => QuestionId.from(`q${n}`);
const opt = (o: string) => OptionId.from(o);

function lesson(overrides: Partial<LessonToAttempt> = {}): LessonToAttempt {
    return {
        id: LessonId.from('intervals-1'),
        published: true,
        requiredLevel: 1,
        questions: [1, 2, 3, 4].map(n => ({
            id: q(n),
            options: [opt('a'), opt('b'), opt('c')],
            correctOptions: [opt('a')],
        })),
        ...overrides,
    };
}

const learner = LearnerId.from('learner-42');

function startedAttempt(): Attempt {
    return Attempt.start(learner, 1, lesson());
}

describe('Attempt.start (creation rules)', () => {
    it('refuses a non-published lesson', () => {
        expect(() => Attempt.start(learner, 1, lesson({ published: false }))).toThrow(LessonNotPublished);
    });

    it('refuses an insufficient level', () => {
        expect(() => Attempt.start(learner, 1, lesson({ requiredLevel: 3 }))).toThrow(InsufficientLevel);
    });

    it('accepts an equal level at required level', () => {
        const attempt = Attempt.start(learner, 2, lesson({ requiredLevel: 2}));
        expect(attempt.isCompleted).toBe(false);
        expect(attempt.pullEvents().map(e => e.name)).toEqual(['LessonStarted']);
    });
});

describe('Attempt.answer (one test per invariant)', () => {
    it('refuses a question already answered, and state doesn\'t change', () => {
        const attempt = startedAttempt();
        attempt.answer(q(1), opt('a'));

        expect(() => attempt.answer(q(1), opt('b'))).toThrow(QuestionAlreadyAnswered);
        expect(attempt.answeredCount).toBe(1);
    });

    it('refuses a question that\'s not in the lesson', () => {
        const attempt = startedAttempt();

        expect(() => attempt.answer(q(99), opt('a'))).toThrow(QuestionNotInLesson);
        expect(attempt.answeredCount).toBe(0)
    });

    it('refuses an option which doesn\'t belong to the question', () => {
        const attempt = startedAttempt();

        expect(() => attempt.answer(q(1), opt('z'))).toThrow(OptionNotInQuestion);
        expect(attempt.answeredCount).toBe(0);
    });

    it('refuses any answer once the attempt is over', () => {
        const attempt = startedAttempt();
        [1, 2, 3, 4].forEach(n => attempt.answer(q(n), opt('a')));

        expect(attempt.isCompleted).toBe(true);
        expect(() => attempt.answer(q(1), opt('a'))).toThrow(AttemptAlreadyCompleted);
    });
});

describe('Automatic end of the attempt', () => {
    it('3 good answers over 4 (75%): succeeded lesson', () => {
        const attempt = startedAttempt();
        attempt.answer(q(1), opt('a'));
        attempt.answer(q(2), opt('a'));
        attempt.answer(q(3), opt('a'));
        attempt.answer(q(4), opt('b'));

        expect(attempt.finalScore?.toNumber()).toBe(75);
        expect(attempt.pullEvents().at(-1)?.name).toBe('LessonSucceeded');
    });

    it('2 good answers over 4 (50%): failed lesson, not an error', () => {
        const attempt = startedAttempt();
        attempt.pullEvents();
        attempt.answer(q(1), opt('a'));
        attempt.answer(q(2), opt('a'));
        attempt.answer(q(3), opt('b'));
        attempt.answer(q(4), opt('c'));

        expect(attempt.finalScore?.toNumber()).toBe(50);
        expect(attempt.pullEvents().at(-1)?.name).toBe('LessonFailed');
    });

    it('internal list can\'t be reached: the compiler refuses', () => {
        const attempt = startedAttempt();
        // @ts-expect-error 'answers' is private
        expect(attempt.answers).toBeDefined();
    });
});