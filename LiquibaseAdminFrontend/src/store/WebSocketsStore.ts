import { io, Socket } from 'socket.io-client'
import { IWebSocketEvent } from '@/lib/webSockets/events/interfaces/IWebSocketEvent'
import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { AppEnvironment } from '@/config/AppEnvironment'
import { InjectableStore, StoreBase } from '@/lib/vue-store'

@InjectableStore('WebSocketsStore')
export class WebSocketsStore extends StoreBase<WebSocketsStore> {
    private static socket: Socket

    public events: IWebSocketEvent[] = []

    public get isConnected(): boolean {
        return WebSocketsStore.socket.connected
    }

    private handleMessage(event: IWebSocketEvent | string): void {
        if (typeof event === 'string') {
            return
        }
        event.uuid = uuid()
        event.createdAt = DateTime.now()
        this.events.push(event)
    }

    deleteEvent(uuid?: string): void {
        const index = this.events.findIndex(p => p.uuid === uuid)
        if (index > -1) {
            this.events.splice(index, 1)
        }
    }

    deleteAllEvents(): void {
        this.events = []
    }

    connect(): void {
        WebSocketsStore.socket.connect()
    }

    setup(): void {
        if (!WebSocketsStore.socket) {
            WebSocketsStore.socket = io(AppEnvironment.AppApi, {
                transports: ['websocket', 'polling'],
                path: '/web-sockets',
            })
            WebSocketsStore.socket.onAny((name: string, event: IWebSocketEvent | string) => this.handleMessage(event))
        }
    }
}
