import type { DomainEvent } from './DomainEvent.js';
import type { EventBus } from './EventBus.js';

type Handler = (event: DomainEvent) => Promise<void>;

export class InMemoryEventBus implements EventBus {
    private readonly handlers = new Map<string, Handler[]>();
    readonly published: DomainEvent[] = [];

    subscribe(eventName: string, handler: Handler): void {
        this.handlers.set(eventName, [...(this.handlers.get(eventName) ?? []), handler]);
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            this.published.push(event);
            for (const handler of this.handlers.get(event.name) ?? []) {
                await handler(event);
            }
        }
    }
}