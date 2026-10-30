import type { Attempt } from '../../domain/Attempt.js';
import type { AttemptId } from '../../domain/ids.js';

export interface AttemptRepository {
    load(id: AttemptId): Promise<Attempt>;
    save(attempt: Attempt): Promise<void>;
}