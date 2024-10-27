import { ExtendedTypeInfo } from '@/lib/extendedTypes/ExtendedTypeInfo'

if (!Object.hasOwn(Object.prototype, '__type')) {
    Object.defineProperty(Object.prototype, '__type', {
        get: function() {
            if (!this.hasOwnProperty('__type')) {
                Object.defineProperty(this, '__type', {
                    value: new ExtendedTypeInfo(),
                    writable: false,
                    enumerable: false,
                    configurable: false,
                })
            }
            return this.__type
        },
        set: function() {
        },
        enumerable: false,
        configurable: true,
    })
}