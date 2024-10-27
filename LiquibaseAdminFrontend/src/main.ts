import 'reflect-metadata'
import '@/lib/extendedTypes/include'
import 'ant-design-vue/dist/reset.css';
import { AppBootstrap } from '@/AppBootstrap'

import './assets/styles/sass/themes/pdm.light.blue.sass'

AppBootstrap.createApp().catch(err => {
    console.log('Can not run app', err)
})
