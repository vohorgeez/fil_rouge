import type { LearnerId } from '../../domain/ids.js';
import type { Progression } from '../../domain/Progression.js';

export interface ProgressionRepository {
    load(learnerId: LearnerId): Promise<Progression>;
    save(progression: Progression): Promise<void>;
}