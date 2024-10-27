import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'

export class GraphqlPlainValue<T> extends GraphqlValue<T> {
    toGraphql(): string {
        return (this.value as any).toString()
    }
}
