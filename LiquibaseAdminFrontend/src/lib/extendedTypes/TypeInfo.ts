import { TObjectTypeInfo } from '@/lib/extendedTypes/types/TObjectTypeInfo'
import { Uuid } from '@/lib/utils/Uuid'

export class TypeInfo {
    constructor(private readonly object: any) {
    }

    public static create(object: any): TypeInfo {
        return new TypeInfo(object)
    }

    public constructorType(): TypeInfo {
        return TypeInfo.create(this.object.constructor)
    }

    public constructorPrototypeType(): TypeInfo {
        return TypeInfo.create(this.object.constructor.__proto__)
    }

    public getTypeId(): string {
        return this.getObjectType().id
    }

    public addMetadata<T>(name: string, value: T): TypeInfo {
        const typeInfo = this.getObjectType()
        typeInfo.metadata[name] = value
        return this
    }

    public addPropertyMetadata<T>(property: string, name: string, value: T): TypeInfo {
        const typeInfo = this.getObjectType()
        if (!typeInfo.propertyMeta[property]) {
            typeInfo.propertyMeta[property] = {}
        }
        typeInfo.propertyMeta[property][name] = value
        return this
    }

    public getDefinedProperties(): string[] {
        const collectedProperties = this.collectPropertyMetadata()
        return Object.keys(collectedProperties)
    }

    public getMetadata<T>(name: string): T | undefined {
        const typeInfo = this.getObjectType()
        return typeInfo.metadata[name]
    }

    public getPropertyMetadata<T>(property: string, name: string): T | undefined {
        const typeInfo = this.getObjectType()
        if (!typeInfo.propertyMeta[property]) {
            return
        }
        return typeInfo.propertyMeta[property][name]
    }

    public getAllPropertiesWithMeta<T>(name: string): Record<string, T> {
        const properties = this.getDefinedProperties()
        const payloadMetadata: Record<string, T> = {}
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i]
            const meta = this.getPropertyMetadata<T>(property, name)
            if (meta) {
                payloadMetadata[property] = meta
            }
        }
        return payloadMetadata
    }

    private collectPropertyMetadata(): Record<string, any> {
        const result: Record<string, Record<string, any>> = {}
        let currentType: TypeInfo = this
        while (currentType.object && (!currentType.isConstructor() && currentType.object.constructor.name != 'Function') || (currentType.isConstructor() && currentType.object.name != 'Function')) {
            const propertyMeta = currentType.getObjectType().propertyMeta
            const properties = Object.keys(propertyMeta)
            for (let i = 0; i < properties.length; i++) {
                const property = properties[i]
                const meta = propertyMeta[property]
                if (!result[property]) {
                    result[property] = {}
                }
                const metaKeys = Object.keys(meta)
                for (let j = 0; j < metaKeys.length; j++) {
                    const metaKey = metaKeys[j]
                    if (!result[property][metaKey]) {
                        result[property][metaKey] = meta[metaKey]
                    }
                }
            }
            currentType = currentType.constructorPrototypeType()
        }
        return result
    }

    private isConstructor(): boolean {
        try {
            Reflect.construct(String, [], this.object)
        } catch (e) {
            return false
        }
        return true
    }

    private getObjectType(): TObjectTypeInfo {
        if (!this.object.$__type) {
            this.object.$__type = {
                id: Uuid.v4(),
                metadata: {},
                propertyMeta: {},
            } as TObjectTypeInfo
        }
        return this.object.$__type
    }
}
