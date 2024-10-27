import { InjectableStore, StoreBase } from '@/lib/vue-store'
import { useAppProps } from 'ant-design-vue/es/app/context'
import { App } from 'ant-design-vue'
import { EventBus } from '@/services/eventBus/EventBus'
import { inject } from 'tsyringe'
import { ErrorNotificationEvent } from '@/models/events/app/notification/ErrorNotificationEvent'
import { SuccessMessageEvent } from '@/models/events/app/message/SuccessMessageEvent'

@InjectableStore('AntAppStore')
export class AntAppStore extends StoreBase<AntAppStore> {
    public app: useAppProps

    constructor(
        @inject(EventBus) private readonly eventBus: EventBus,
    ) {
        super()
    }

    init(): void {
        this.app = App.useApp()

        this.eventBus.registerHandler(ErrorNotificationEvent, event => {
            this.app.notification[event.type](event.options)
        })

        this.eventBus.registerHandler(SuccessMessageEvent, event => {
            this.app.message[event.type](event.content)
        })
    }
}
