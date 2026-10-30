import type { EventBus } from '../../shared/EventBus.js';
import { AttemptId, OptionId, QuestionId } from '../domain/ids.js';
import type { AttemptRepository } from './ports/AttemptRepository.js';

// Service applicatif
export class AnswerQuestion {
    constructor(
        private readonly attempts: AttemptRepository,
        private readonly bus: EventBus,
    ) {}

    async execute(attemptId: string, questionId: string, optionId: string): Promise<void> {
        const attempt = await this.attempts.load(AttemptId.from(attemptId));
        attempt.answer(QuestionId.from(questionId), OptionId.from(optionId));
        await this.attempts.save(attempt);
        await this.bus.publish(attempt.pullEvents());
    }
}