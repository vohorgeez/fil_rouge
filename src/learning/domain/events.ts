import type { DomainEvent } from '../../shared/DomainEvent.js';
import type { AttemptId, LearnerId, LessonId, QuestionId } from './ids.js';
import type { Score } from './Score.js';

export class LessonStarted implements DomainEvent {
    readonly name = 'LessonStarted';
    readonly occurredAt = new Date();
    constructor(
        readonly attemptId: AttemptId,
        readonly learnerId: LearnerId,
        readonly lessonId: LessonId,
    ) {}
}

export class QuestionAnswered implements DomainEvent {
    readonly name = 'QuestionAnswered';
    readonly occuredAt = new Date();
    constructor(
        readonly attemptId: AttemptId,
        readonly questionId: QuestionId,
        readonly correct: boolean,
    ) {}
}

export class LessonSucceeded implements DomainEvent {
    readonly name = 'LessonSucceeded';
    readonly occurredAt = new Date();
    constructor(
        readonly attemptId: AttemptId,
        readonly learnerId: LearnerId,
        readonly lessonId: LessonId,
        readonly score: Score,
    ) {}
}

export class LessonFailed implements DomainEvent {
    readonly name = 'LessonFailed';
    readonly occuredAt = new Date();
    constructor(
        readonly attemptId: AttemptId,
        readonly learnerId: LearnerId,
        readonly lessonId: LessonId,
        readonly score: Score,
    ) {}
}