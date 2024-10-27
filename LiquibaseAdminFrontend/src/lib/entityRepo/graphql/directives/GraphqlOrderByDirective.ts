import { GraphqlDirective } from '@/lib/entityRepo/graphql/models/GraphqlDirective'
import { TGqlOrderByItem } from '@/lib/entityRepo/graphql/repository/GqlApiRepository'
import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlEnumValue } from '@/lib/entityRepo/graphql/models/values/GraphqlEnumValue'
import { GraphqlNumberValue } from '@/lib/entityRepo/graphql/models/values/GraphqlNumberValue'

export class GraphqlOrderByDirective extends GraphqlDirective {
    constructor(item: TGqlOrderByItem) {
        super('orderBy', [
            new GraphqlArg('direction', new GraphqlEnumValue(item.direction.toUpperCase())),
            new GraphqlArg('index', new GraphqlNumberValue(item.index)),
        ])
    }
}
