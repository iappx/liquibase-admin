import { DateTime } from 'luxon'

export interface IWebSocketEvent {
    readonly eventName: string

    uuid?: string

    createdAt?: DateTime
}