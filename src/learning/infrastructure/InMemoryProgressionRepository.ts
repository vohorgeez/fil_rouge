import type { ProgressionRepository } from "../app/ports/ProgressionRepository.js";
import type { LearnerId } from '../domain/ids.js';
import { Progression } from '../domain/Progression.js';

export class InMemoryProgressionRepository implements ProgressionRepository {
    private readonly store = new Map<string, Progression>();

    async load(learnerId: LearnerId): Promise<Progression> {
        return this.store.get(learnerId.toString()) ?? new Progression(learnerId);
    }

    async save(progression: Progression): Promise<void> {
        this.store.set(progression.learnerId.toString(), progression);
    }
}