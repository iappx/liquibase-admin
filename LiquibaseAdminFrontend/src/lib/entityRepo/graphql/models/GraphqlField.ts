import { GraphqlDirective } from '@/lib/entityRepo/graphql/models/GraphqlDirective'

export class GraphqlField {
    private readonly directives: GraphqlDirective[] = []
    private readonly nestedFields: GraphqlField[] = []

    constructor(
        public readonly name: string,
    ) {
    }

    public addField(field: GraphqlField): GraphqlField {
        this.nestedFields.push(field)
        return this
    }

    public addFields(fields: GraphqlField[]): GraphqlField {
        for (let i = 0; i < fields.length; i++) {
            this.addField(fields[i])
        }
        return this
    }

    public addDirective(directive: GraphqlDirective): GraphqlField {
        this.directives.push(directive)
        return this
    }

    public toGraphql(): string {
        let result = this.name
        if (this.directives) {
            const directiveValues = this.directives.map(p => p.toGraphql())
            result += directiveValues.join(' ')
        }
        if (this.nestedFields.length > 0) {
            const nestedFieldValues = this.nestedFields.map(p => p.toGraphql())
            result += `{ ${nestedFieldValues.join(' ')} }`
        }
        return result
    }
}
