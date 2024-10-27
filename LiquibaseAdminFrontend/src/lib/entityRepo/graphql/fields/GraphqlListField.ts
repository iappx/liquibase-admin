import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'

export class GraphqlListField extends GraphqlField {
    constructor(fields: GraphqlListField[]) {
        super('list')
        this.addFields(fields)
    }
}
