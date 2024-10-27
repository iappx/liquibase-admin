import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'
import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'

export class GraphqlQuery {
    public args: GraphqlArg[] = []
    public queryType = 'query'

    constructor(
        public readonly name: string,
        public readonly fields: GraphqlField[],
    ) {
    }

    addArgs(...args: GraphqlArg[]): GraphqlQuery {
        this.args.push(...args)
        return this
    }

    addArg(name: string, value: GraphqlValue<any>): GraphqlQuery {
        this.args.push(new GraphqlArg(name, value))
        return this
    }

    public toGraphql(): string {
        const fieldValues = this.fields.map(p => p.toGraphql())
        let result = `${this.queryType} { ${this.name}`
        if (this.args.length > 0) {
            const argValues = this.args.map(p => p.toGraphql())
            result += `(${argValues.join(', ')})`
        }
        return `${result} { ${fieldValues.join(' ')} }}`
    }
}
