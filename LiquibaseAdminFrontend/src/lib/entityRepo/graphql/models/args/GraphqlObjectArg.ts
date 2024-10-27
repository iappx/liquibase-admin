import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlObjectValue } from '@/lib/entityRepo/graphql/models/values/GraphqlObjectValue'

export class GraphqlObjectArg extends GraphqlArg {
    constructor(name: string, data: Record<string, any>) {
        super(name, GraphqlObjectValue.fromObject(data))
    }
}
