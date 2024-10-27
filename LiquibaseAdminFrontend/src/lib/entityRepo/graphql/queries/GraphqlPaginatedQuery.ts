import { GraphqlQuery } from '@/lib/entityRepo/graphql/models/GraphqlQuery'
import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'
import { GraphqlListField } from '@/lib/entityRepo/graphql/fields/GraphqlListField'
import { GraphqlPaginationInfoField } from '@/lib/entityRepo/graphql/fields/GraphqlPaginationInfoField'
import { GraphqlNumberArg } from '@/lib/entityRepo/graphql/models/args/GraphqlNumberArg'

export class GraphqlPaginatedQuery extends GraphqlQuery {
    public static create(entityName: string, entityFields: GraphqlField[], page: number, limit: number): GraphqlPaginatedQuery {
        const listField = new GraphqlListField(entityFields)
        const paginationInfoField = new GraphqlPaginationInfoField()
        const query = new GraphqlPaginatedQuery(entityName, [listField, paginationInfoField])
        query.addArgs(
            new GraphqlNumberArg('limit', limit),
            new GraphqlNumberArg('page', page),
        )
        return query
    }
}
