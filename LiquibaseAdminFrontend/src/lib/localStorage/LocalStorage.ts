import { plainToInstance } from 'class-transformer'
import { LocalStorageEntityBase } from '@/lib/localStorage/entity/base/LocalStorageEntityBase'
import { LsEntityStatic } from '@/lib/localStorage/entity/decorators/LocalStorageEntity'
import { Base64 } from '@/lib/encoding/Base64'
import { Constructor } from '@/lib/types/Constructor'

export class LocalStorage {
    static load<T>(item: Constructor<T>): T | null {
        const data = localStorage.getItem(this.getKey(item))
        if (data) {
            try {
                const obj = JSON.parse(data)
                return plainToInstance(item, obj) as T
            } catch (err) {
                return null
            }
        }
        return null
    }

    static save<T>(ctor: Constructor<T>, instance: T): void {
        localStorage.setItem(this.getKey(ctor), JSON.stringify(instance))
    }

    static saveEntity(entity: LocalStorageEntityBase, key?: string, secure = false): void {
        const name = key || entity.constructor['_entityName'] || entity.constructor.name
        const data = entity.getDataValues()

        let rawData = JSON.stringify(data)
        if (secure) {
            rawData = Base64.stringToB64(rawData)
        }

        localStorage.setItem(name, rawData)
    }

    static loadEntity<T extends LocalStorageEntityBase>(entity: LsEntityStatic<T>, key?: string, secure = false): T | null {
        const name = key || entity._entityName || entity.name
        let rawData = localStorage.getItem(name)
        if (rawData) {
            try {
                if (secure) {
                    rawData = Base64.b64ToString(rawData)
                }
                const data = JSON.parse(rawData)
                const instance = new entity()
                instance.setDataValues(data)
                return instance
            } catch (e) {
            }
        }
        return null
    }

    static deleteEntity(entity: LsEntityStatic<any>, key?: string): void {
        const name = key || entity._entityName || entity.name
        localStorage.removeItem(name)
    }

    static delete(ctor: Constructor<any>): void {
        localStorage.removeItem(this.getKey(ctor))
    }

    static getKey(type: Constructor<any>): string {
        return type.name
    }
}
