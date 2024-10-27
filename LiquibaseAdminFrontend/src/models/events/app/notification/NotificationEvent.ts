import { ArgsProps } from 'ant-design-vue/es/notification/interface'
import { NotificationType } from '@/models/events/app/enum/NotificationType'

export class NotificationEvent {
    constructor(
        public readonly type: NotificationType,
        public readonly options: ArgsProps,
    ) {
    }
}
