import mitt, { Emitter } from 'mitt'
import { singleton } from 'tsyringe'
import { Constructor } from '@/lib/types/Constructor'

export type EventHandler<T> = (event: T) => Promise<void> | void

@singleton()
export class EventBus {
    private readonly emitter: Emitter<any>

    public constructor() {
        this.emitter = mitt()
    }

    public registerHandler<T>(event: Constructor<T>, handler: EventHandler<T>): void {
        this.emitter.on(event.__type.guid, handler)
    }

    public unregisterHandler<T>(event: Constructor<T>, handler: EventHandler<T>): void {
        this.emitter.off(event.__type.guid, handler)
    }

    public emitEvent<T extends {}>(event: T): void {
        this.emitter.emit(event.constructor.__type.guid, event)
    }
}
