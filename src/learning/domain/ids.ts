import { InvalidID } from "./errors.js";

function checkNotBlank(value: string, label: string): void {
    if (value.trim() === '') {
        throw new InvalidID(`${label} must not be empty`);
    }
}

export class AttemptId {
    private constructor(private readonly value: string) {}

    public static new(): AttemptId {
        const id = new AttemptId(crypto.randomUUID());
        return id
    }

    public static from(value: string): AttemptId {
        checkNotBlank(value, 'AttemptId');
        return new AttemptId(value);
    }

    public equals(other: AttemptId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }
}

export class LessonId {
    private constructor(private readonly value: string) {}

    public static from(value: string): LessonId {
        checkNotBlank(value, 'LessonId');
        return new LessonId(value);
    }

    public equals(other: LessonId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }
}

export class QuestionId {
    private constructor(private readonly value: string) {}

    public static from(value: string): QuestionId {
        checkNotBlank(value, 'QuestionId');
        return new QuestionId(value);
    }

    public equals(other: QuestionId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }
}

export class OptionId {
    private constructor(private readonly value: string) {}

    public static from(value: string): OptionId {
        checkNotBlank(value, 'OptionId');
        return new OptionId(value);
    }

    public equals(other: OptionId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }
}

export class LearnerId {
    private constructor(private readonly value: string) {}

    public static from(value: string): LearnerId {
        checkNotBlank(value, 'LearnerId');
        return new LearnerId(value);
    }

    public equals(other: LearnerId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }
}