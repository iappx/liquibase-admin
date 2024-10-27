import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'

export class GraphqlDirective {
    constructor(
        public readonly name: string,
        public readonly args?: GraphqlArg[],
    ) {
    }

    public toGraphql(): string {
        let result = `@${this.name}`
        if (this.args && this.args.length > 0) {
            const argValues = this.args.map(p => p.toGraphql())
            result += `(${argValues.join(', ')})`
        }
        return result
    }
}
