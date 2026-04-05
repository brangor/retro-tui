// src/protocol/event-router.ts
import type { TuiEvent } from './types';

/** Any element that can receive protocol events */
export interface TuiEventReceiver {
  handleEvent(event: TuiEvent): void;
}

export interface EventRouterOptions {
  /** Called when an event arrives for an unregistered id. Return a component to auto-register, or null to ignore. */
  onCreate?: (event: TuiEvent) => TuiEventReceiver | null;
}

/**
 * EventRouter — maps event ids to components and dispatches protocol events.
 *
 * Sits between RetroPush and the component tree. When an event arrives:
 * 1. Look up the component by event.id
 * 2. If found, call component.handleEvent(event)
 * 3. If not found and onCreate is set, call onCreate to create a component
 * 4. If event type is 'dismiss', unregister the component after delivery
 */
export class EventRouter {
  private components = new Map<string, TuiEventReceiver>();
  private onCreate: EventRouterOptions['onCreate'];

  constructor(options: EventRouterOptions = {}) {
    this.onCreate = options.onCreate;
  }

  register(id: string, component: TuiEventReceiver): void {
    this.components.set(id, component);
  }

  unregister(id: string): void {
    this.components.delete(id);
  }

  has(id: string): boolean {
    return this.components.has(id);
  }

  route(event: TuiEvent): void {
    let component = this.components.get(event.id);
    if (!component && this.onCreate) {
      const created = this.onCreate(event);
      if (created) {
        this.register(event.id, created);
        component = created;
      }
    }
    if (!component) return;
    component.handleEvent(event);
    if (event.type === 'dismiss') {
      this.unregister(event.id);
    }
  }
}
