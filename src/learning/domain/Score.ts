import { InvalidScoreError } from './errors.js';

const PASSING_THRESHOLD = 75;

export class Score {
    private constructor(private readonly value: number) {}

    public static create(value: number): Score {
        if (value < 0 || value > 100 || !Number.isInteger(value)) {
            throw new InvalidScoreError(`${value} is not between 0 and 100 or not an integer`);
        }
        return new Score(value);
    }

    public static fromAnswers(correct: number, total: number): Score {
        if (!Number.isInteger(correct) || !Number.isInteger(total) || total <= 0 || correct < 0 || correct > total) {
            throw new InvalidScoreError(`${correct}/${total} is not a valid result`);
        }
        return new Score(Math.floor((correct*100)/total));
    }

    public isSuccessful(): boolean {
        return this.value >= PASSING_THRESHOLD;
    }

    public equals(score: Score): boolean {
        return this.value === score.value;
    }

    public toNumber(): number {
        return this.value
    }
}