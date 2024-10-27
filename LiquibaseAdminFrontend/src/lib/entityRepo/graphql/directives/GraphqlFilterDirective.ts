import { GraphqlDirective } from '@/lib/entityRepo/graphql/models/GraphqlDirective'
import { TGqlFilterItem } from '@/lib/entityRepo/graphql/repository/GqlApiRepository'
import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlArrayValue } from '@/lib/entityRepo/graphql/models/values/GraphqlArrayValue'
import { GraphqlObjectValue } from '@/lib/entityRepo/graphql/models/values/GraphqlObjectValue'
import { GraphqlEnumValue } from '@/lib/entityRepo/graphql/models/values/GraphqlEnumValue'
import { GraphqlStringValue } from '@/lib/entityRepo/graphql/models/values/GraphqlStringValue'

export class GraphqlFilterDirective extends GraphqlDirective {
    constructor(
        filterItems: TGqlFilterItem[],
        name = 'filters',
    ) {
        const filterValues = filterItems.map(p => {
            let filterValue: GraphqlStringValue | GraphqlArrayValue<GraphqlStringValue>
            if (Array.isArray(p.value)) {
                filterValue = new GraphqlArrayValue(p.value.map(p => new GraphqlStringValue(p)))
            } else {
                filterValue = new GraphqlStringValue(p.value)
            }
            return new GraphqlObjectValue({
                operation: new GraphqlEnumValue(p.operation),
                value: filterValue,
            })
        })
        super(name, [
            new GraphqlArg('items', new GraphqlArrayValue(filterValues)),
        ])
    }
}
