import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'

export class GraphqlArg {
    constructor(
        public readonly name: string,
        public readonly value: GraphqlValue<any>,
    ) {
    }

    public toGraphql(): string {
        return `${this.name}: ${this.value.toGraphql()}`
    }
}
