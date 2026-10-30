import type { DomainEvent } from '../../shared/DomainEvent.js';
import {
    AttemptAlreadyCompleted,
    EmptyLesson,
    InsufficientLevel,
    LessonNotPublished,
    OptionNotInQuestion,
    QuestionAlreadyAnswered,
    QuestionNotInLesson,
} from './errors.js';
import { LessonFailed, LessonStarted, LessonSucceeded, QuestionAnswered } from './events.js';
import { AttemptId, type LearnerId, type LessonId, type OptionId, type QuestionId } from './ids.js';
import { Score } from './Score.js';

export type LessonQuestion = {
    readonly id: QuestionId;
    readonly options: readonly OptionId[];
    readonly correctOptions: readonly OptionId[];
};

export type LessonToAttempt = {
    readonly id: LessonId;
    readonly published: boolean;
    readonly requiredLevel: number;
    readonly questions: readonly LessonQuestion[];
};

type Answer = {
    readonly questionId: QuestionId;
    readonly optionId: OptionId;
    readonly correct: boolean;
};

type Status = 'inProgress' | 'completed';

export class Attempt {
    private readonly answers: Answer[] = [];
    private events: DomainEvent[] = [];
    private status: Status = 'inProgress';
    private score: Score | null = null;

    private constructor(
        readonly id: AttemptId,
        readonly learnerId: LearnerId,
        readonly lessonId: LessonId,
        private readonly questions: readonly LessonQuestion[],
    ) {}

    // Factory
    public static start(learnerId: LearnerId, learnerLevel: number, lesson: LessonToAttempt): Attempt {
        if (!lesson.published) throw new LessonNotPublished(lesson.id);
        if (learnerLevel < lesson.requiredLevel) throw new InsufficientLevel(learnerLevel, lesson.requiredLevel);
        if (lesson.questions.length === 0) throw new EmptyLesson(lesson.id);

        const attempt = new Attempt(AttemptId.new(), learnerId, lesson.id, [...lesson.questions]);
        attempt.events.push(new LessonStarted(attempt.id, learnerId, lesson.id));
        return attempt;
    }

    public answer(questionId: QuestionId, optionId: OptionId): void {
        if (this.status === 'completed') throw new AttemptAlreadyCompleted(this.id);

        const question = this.questions.find(q => q.id.equals(questionId));
        if (!question) throw new QuestionNotInLesson(questionId);

        if (this.answers.some(a => a.questionId.equals(questionId))) {
            throw new QuestionAlreadyAnswered(questionId);
        }
        if (!question.options.some(o => o.equals(optionId))) {
            throw new OptionNotInQuestion(optionId, questionId);
        }

        const correct = question.correctOptions.some(o => o. equals(optionId));
        this.answers.push({ questionId, optionId, correct });
        this.events.push(new QuestionAnswered(this.id, questionId, correct));

        if (this.answers.length === this.questions.length) this.complete();
    }

    private complete(): void {
        this.status = 'completed';
        const correctCount = this.answers.filter(a => a.correct).length;
        const score = Score.fromAnswers(correctCount, this.questions.length);
        this.score = score;

        this.events.push(
            score.isSuccessful()
                ? new LessonSucceeded(this.id, this.learnerId, this.lessonId, score)
                : new LessonFailed(this.id, this.learnerId, this.lessonId, score),
        );
    }

    public get answeredCount(): number {
        return this.answers.length;
    }

    public get isCompleted(): boolean {
        return this.status === 'completed';
    }

    public get finalScore(): Score | null {
        return this.score;
    }

    public pullEvents(): DomainEvent[] {
        const events = this.events;
        this.events = [];
        return events;
    }
}