import { ISetupStore } from '@/lib/vue-store'
import { Store } from 'pinia-class-transformer'
import { Constructor } from '@/lib/types/Constructor'

export abstract class StoreBase<T extends Record<string, any>> extends Store<T> implements ISetupStore {

    public static StoreToken<T extends Record<string, any>>(this: Constructor<StoreBase<T>>): string {
        return Reflect.getMetadata('storeName', this) + '_token'
    }

    setup(): void {
        // console.log('setup base')
    }
}
