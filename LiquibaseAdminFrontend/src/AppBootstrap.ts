import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createComponentRouter } from '@/router'
import 'reflect-metadata'
import { AppApi } from '@/api/AppApi'
import { AppApiContext } from '@/api/context/AppApiContext'
import { container } from 'tsyringe'
import { EventBus } from '@/services/eventBus/EventBus'
import { ErrorNotificationEvent } from '@/models/events/app/notification/ErrorNotificationEvent'
import { DiTokens } from '@/constants/DiTokens'

export class AppBootstrap {
    public static async createApp(): Promise<void> {

        const pinia = createPinia()

        const app = createApp(App)

        const router = await createComponentRouter()

        const pdmApi = AppApi.create(error => {
            const eventBus = container.resolve(EventBus)
            console.log(error)
            eventBus.emitEvent(new ErrorNotificationEvent({ message: 'Api error', description: error.message }))
        })

        container.register(AppApiContext, { useFactory: () => pdmApi.getContext(AppApiContext) })
        container.register(AppApi, { useValue: pdmApi })
        container.register(DiTokens.Router, { useValue: router })

        app.use(pinia)
        app.use(Antd)

        app.use(router)
        app.mount('#app')
    }
}
