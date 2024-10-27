import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlStringValue } from '@/lib/entityRepo/graphql/models/values/GraphqlStringValue'

export class GraphqlStringArg extends GraphqlArg {
    constructor(name: string, value: string) {
        super(name, new GraphqlStringValue(value))
    }
}
