import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'
import { GraphqlQuery } from '@/lib/entityRepo/graphql/models/GraphqlQuery'

export class GraphqlMutation extends GraphqlQuery {
    constructor(
        public readonly name: string,
        public readonly fields: GraphqlField[],
    ) {
        super(name, fields)
        this.queryType = 'mutation'
    }
}
