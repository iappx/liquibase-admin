import { AppMessageEvent } from '@/models/events/app/message/AppMessageEvent'
import { NotificationType } from '@/models/events/app/enum/NotificationType'
import { JointContent } from 'ant-design-vue/es/message/interface'

export class SuccessMessageEvent extends AppMessageEvent {
    constructor(content: JointContent) {
        super(NotificationType.Success, content)
    }
}
