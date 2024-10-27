import { LocalStorageEntityBase } from '@/lib/localStorage/entity/base/LocalStorageEntityBase'
import { NonConstructor } from '@i-app/api-entity-repo'

export type LsEntityStatic<M extends LocalStorageEntityBase> =
    NonConstructor<typeof LocalStorageEntityBase>
    & { new(): M };

export const LocalStorageEntity = (name: string) => (target: LsEntityStatic<any>) => {
    target._entityName = name
}