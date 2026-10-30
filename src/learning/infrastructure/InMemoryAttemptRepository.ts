import type { AttemptRepository } from "../app/ports/AttemptRepository.js";
import type { Attempt } from '../domain/Attempt.js';
import type { AttemptId } from '../domain/ids.js';

export class InMemoryAttemptRepository implements AttemptRepository {
    private readonly store = new Map<string, Attempt>();

    async load(id: AttemptId): Promise<Attempt> {
        const attempt = this.store.get(id.toString());
        if (!attempt) throw new Error(`Attempt ${id.toString()} not found`);
        return attempt;
    }

    async save(attempt: Attempt): Promise<void> {
        this.store.set(attempt.id.toString(), attempt);
    }
}