import { LocalStorageEntityBase } from '@/lib/localStorage/entity/base/LocalStorageEntityBase'

export const LsEntityField = (name?: string) => <T extends LocalStorageEntityBase>(target: T, propertyKey: string) => {
    if (!target._attributeInfo) {
        target._attributeInfo = {}
    }
    target._attributeInfo[propertyKey] = {}
    delete target[propertyKey]
    Object.defineProperty(target, propertyKey, {
        get: function(this: LocalStorageEntityBase) {
            return this.getDataValue(propertyKey)
        },
        set: function <K extends keyof T>(this: T, value: T[K]) {
            this.setDataValue(propertyKey, value)
        },
        enumerable: true,
        configurable: true,
    })
}