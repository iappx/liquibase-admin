import { container, singleton } from 'tsyringe'
import { defineStore } from 'pinia'
import { Constructor } from '../types/Constructor'
import { transformClass } from '../utils/class-transformer/transformClass'

export const InjectableStore = (name: string) => (target: Constructor<any>) => {
    singleton()(target)
    Reflect.defineMetadata('storeName', name, target)
    container.register(name, target)
    const storeFunc = defineStore(name, transformClass(target))
    container.register(name + '_token', { useFactory: () => storeFunc() })
}
