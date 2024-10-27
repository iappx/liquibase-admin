import { ExtendedTypeInfo } from '@/lib/extendedTypes/ExtendedTypeInfo'

declare global {
    interface Object {
        readonly __type: ExtendedTypeInfo
    }
}