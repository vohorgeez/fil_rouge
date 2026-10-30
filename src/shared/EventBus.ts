import type { DomainEvent } from "./DomainEvent.js";

// Port
export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
}