import { NotificationEvent } from '@/models/events/app/notification/NotificationEvent'
import { NotificationType } from '@/models/events/app/enum/NotificationType'
import { ArgsProps } from 'ant-design-vue/es/notification/interface'

export class ErrorNotificationEvent extends NotificationEvent {
    constructor(
        options: ArgsProps,
    ) {
        super(NotificationType.Error, options)
    }
}
