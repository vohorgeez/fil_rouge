import type { LessonSucceeded } from '../domain/events.js';
import type { ProgressionRepository } from './ports/ProgressionRepository.js';

// Handler
export class WhenLessonSucceeded {
    constructor(private readonly progressions: ProgressionRepository) {}

    async handle(event: LessonSucceeded): Promise<void> {
        const progression = await this.progressions.load(event.learnerId);
        progression.recordSuccess(event.lessonId);
        await this.progressions.save(progression);
    }
}