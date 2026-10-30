import { describe, expect, it } from 'vitest';
import { AnswerQuestion } from '../../../src/learning/app/AnswerQuestion.js';
import { WhenLessonSucceeded } from '../../../src/learning/app/WhenLessonSucceeded.js';
import { Attempt } from '../../../src/learning/domain/Attempt.js';
import type { LessonSucceeded } from '../../../src/learning/domain/events.js';
import { LearnerId, LessonId, OptionId, QuestionId } from '../../../src/learning/domain/ids.js';
import { InMemoryAttemptRepository } from '../../../src/learning/infrastructure/InMemoryAttemptRepository.js';
import { InMemoryProgressionRepository } from '../../../src/learning/infrastructure/InMemoryProgressionRepository.js';
import { InMemoryEventBus } from '../../../src/shared/InMemoryEventBus.js';

describe('AnswerQuestion + WhenLessonSucceeded (without database)', () => {
    it('a lesson succeeded make the level increase once', async () => {
        const attempts = new InMemoryAttemptRepository();
        const progressions = new InMemoryProgressionRepository();
        const bus = new InMemoryEventBus();
        const handler = new WhenLessonSucceeded(progressions);
        bus.subscribe('LessonSucceeded', e => handler.handle(e as LessonSucceeded));

        const learner = LearnerId.from('learner-42');
        const attempt = Attempt.start(learner, 0, {
            id: LessonId.from('intervals-1'),
            published: true,
            requiredLevel: 0,
            questions: [{ id: QuestionId.from('q1'), options: [OptionId.from('a'), OptionId.from('b')], correctOptions: [OptionId.from('a')]}],
        });
        await attempts.save(attempt);

        const answerQuestion = new AnswerQuestion(attempts, bus);
        await answerQuestion.execute(attempt.id.toString(), 'q1', 'a');

        expect((await progressions.load(learner)).level).toBe(1);

        const succeeded = bus.published.find(e => e.name === 'LessonSucceeded') as LessonSucceeded;
        await handler.handle(succeeded);
        expect((await progressions.load(learner)).level).toBe(1);
    });
});