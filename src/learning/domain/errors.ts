import type { AttemptId, LessonId, OptionId, QuestionId } from './ids.js';

abstract class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

// Value objects
export class InvalidScoreError extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidScoreError';
    }
}

export class InvalidID extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidID';
    }
}

// Création d'une tentative
export class LessonNotPublished extends DomainError {
    constructor(lessonId: LessonId) {
        super(`Lesson ${lessonId.toString()} is not published`);
    }
}

export class InsufficientLevel extends DomainError {
    constructor(learnerLevel: number, requiredLevel: number) {
        super(`Level ${learnerLevel} is below required level ${requiredLevel}`);
    }
}

export class EmptyLesson extends DomainError {
    constructor(lessonId: LessonId) {
        super(`Lesson ${lessonId.toString()} has no question`);
    }
}

// Invariants

export class AttemptAlreadyCompleted extends DomainError {
    constructor(attemptId: AttemptId) {
        super(`Attempt ${attemptId.toString()} is already completed`);
    }
}

export class QuestionNotInLesson extends DomainError {
    constructor(questionId: QuestionId) {
        super(`Question ${questionId.toString()} is not part of this lesson`);
    }
}

export class QuestionAlreadyAnswered extends DomainError {
    constructor(questionId: QuestionId) {
        super(`Question ${questionId.toString()} has already been answered`);
    }
}

export class OptionNotInQuestion extends DomainError {
    constructor(optionId: OptionId, questionId: QuestionId) {
        super(`Option ${optionId.toString()} does not belong to question ${questionId.toString()}`);
    }
}