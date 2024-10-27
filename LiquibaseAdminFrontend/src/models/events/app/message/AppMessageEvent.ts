import { NotificationType } from '@/models/events/app/enum/NotificationType'
import { JointContent } from 'ant-design-vue/es/message/interface'

export class AppMessageEvent {
    constructor(
        public readonly type: NotificationType,
        public readonly content: JointContent,
    ) {
    }
}
