import { GraphqlValue } from '@/lib/entityRepo/graphql/models/values/GraphqlValue'
import { GraphqlNumberValue } from '@/lib/entityRepo/graphql/models/values/GraphqlNumberValue'
import { GraphqlStringValue } from '@/lib/entityRepo/graphql/models/values/GraphqlStringValue'
import { GraphqlArrayValue } from '@/lib/entityRepo/graphql/models/values/GraphqlArrayValue'
import { GraphqlPlainValue } from '@/lib/entityRepo/graphql/models/values/GraphqlPlainValue'
import { GraphqlBooleanValue } from '@/lib/entityRepo/graphql/models/values/GraphqlBooleanValue'

export class GraphqlObjectValue extends GraphqlValue<Record<string, GraphqlValue<any>>> {
    toGraphql(): string {
        const resultValues: string[] = []
        const keys = Object.keys(this.value)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = this.value[key]
            resultValues.push(`${key}: ${value.toGraphql()}`)
        }
        return `{ ${resultValues.join(', ')} }`
    }

    public static fromObject(data: Record<string, any>): GraphqlObjectValue {
        const keys = Object.keys(data)
        const resultObject: Record<string, GraphqlValue<any>> = {}
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = data[key]
            if (Array.isArray(value)) {
                resultObject[key] = new GraphqlArrayValue(value.map(p => this.fromObject(p)))
            } else {
                switch (typeof value) {
                    case 'number':
                    case 'bigint':
                        resultObject[key] = new GraphqlNumberValue(value as number)
                        break
                    case 'object':
                        if (!value) {
                            resultObject[key] = new GraphqlPlainValue('null')
                        } else {
                            resultObject[key] = GraphqlObjectValue.fromObject(value)
                        }
                        break
                    case 'boolean':
                        resultObject[key] = new GraphqlBooleanValue(value)
                        break
                    default:
                        resultObject[key] = new GraphqlStringValue(value)
                }
            }
        }
        return new GraphqlObjectValue(resultObject)
    }
}
