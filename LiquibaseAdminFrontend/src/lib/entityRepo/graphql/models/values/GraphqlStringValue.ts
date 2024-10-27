import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'

export class GraphqlStringValue extends GraphqlValue<string> {
    toGraphql(): string {
        return `"${this.value}"`
    }
}
