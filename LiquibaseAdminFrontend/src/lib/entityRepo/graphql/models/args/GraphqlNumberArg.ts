import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlNumberValue } from '@/lib/entityRepo/graphql/models/values/GraphqlNumberValue'

export class GraphqlNumberArg extends GraphqlArg {
    constructor(name: string, value: number) {
        super(name, new GraphqlNumberValue(value))
    }
}
