import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'

export class GraphqlArrayValue<T extends GraphqlValue<any>> extends GraphqlValue<T[]> {
    toGraphql(): string {
        const values = this.value.map(p => p.toGraphql())
        return `[${values.join(', ')}]`
    }
}
