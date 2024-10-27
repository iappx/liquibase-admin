import { TLsEntityAttribute } from '@/lib/localStorage/entity/types/TLsEntityAttribute'

export abstract class LocalStorageEntityBase<TModelAttributes extends {} = any> {
    public static _entityName: string

    protected dataValues: TModelAttributes

    _attributes: TModelAttributes

    _attributeInfo: Record<keyof TModelAttributes, TLsEntityAttribute>

    public getDataValue<K extends keyof TModelAttributes>(key: K): TModelAttributes[K] | undefined {
        if (!this._attributeInfo || !this._attributeInfo[key]) {
            return undefined
        }
        if (!this.dataValues) {
            this.dataValues = {} as TModelAttributes
        }
        return this.dataValues[key]
    }

    public setDataValue<K extends keyof TModelAttributes>(key: K | string, value: TModelAttributes[K] | any): void {
        if (!this.dataValues) {
            this.dataValues = {} as TModelAttributes
        }
        if (!this._attributeInfo) {
            return
        }
        const _key = key as K
        const attributeInfo = this._attributeInfo[_key]
        if (attributeInfo) {
            this.dataValues[_key] = value
        }
    }

    public getDataValues(): TModelAttributes {
        return this.dataValues
    }

    public setDataValues<K extends keyof TModelAttributes>(data: Record<string, any>): void {
        if (!data) {
            return
        }
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = data[key]
            this.setDataValue(key, value)
        }
    }
}