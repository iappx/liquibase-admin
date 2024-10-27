import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'
import { GraphqlFilterDirective } from '@/lib/entityRepo/graphql/directives/GraphqlFilterDirective'
import { GraphqlOrderByDirective } from '@/lib/entityRepo/graphql/directives/GraphqlOrderByDirective'
import { RepoEntityStatic } from '@i-app/api-entity-repo'
import { TGqlFilterItem, TGqlOrderByItem } from '@/lib/entityRepo/graphql/repository/GqlApiRepository'
import { RepoEntityBase } from '@i-app/api-entity-repo/lib/entity/RepoEntityBase'

export type TEntityGqlOptions = {
    filter?: Record<string, TGqlFilterItem[]>
    order?: Record<string, TGqlOrderByItem>
    excludeFields?: string[]
}

export class GraphqlEntity<M extends RepoEntityBase> {
    constructor(
        public readonly entity: RepoEntityStatic<M>,
    ) {

    }

    public getFields(options?: TEntityGqlOptions): GraphqlField[] {
        return this.getFieldsRecursive(this.entity, options)
    }

    private getFieldsRecursive(entity: RepoEntityStatic<any>, options?: TEntityGqlOptions, path?: string): GraphqlField[] {
        if (!path) {
            path = ''
        }
        const filter = options?.filter || {}
        const order = options?.order || {}
        const excludedFields = options?.excludeFields || []
        const fieldKeys = Object.keys(entity.prototype._attributeInfo)
        const result: GraphqlField[] = []
        for (let i = 0; i < fieldKeys.length; i++) {
            const fieldKey = fieldKeys[i]
            const fieldPath = [path, fieldKey].filter(p => !!p).join('.')
            if (excludedFields.find(p => p == fieldPath)) {
                continue
            }
            const graphqlField = new GraphqlField(fieldKey)
            const attribute = entity.prototype._attributeInfo[fieldKey]
            if (attribute?.nestedType) {
                graphqlField.addFields(this.getFieldsRecursive(attribute.nestedType(), options, fieldPath))
            } else {
                if (filter[fieldPath]) {
                    const filterItems = filter[fieldPath]
                    if (filterItems) {
                        const filterDirective = new GraphqlFilterDirective(filterItems)
                        graphqlField.addDirective(filterDirective)
                    }
                }
                if (order[fieldPath]) {
                    const orderByDirective = new GraphqlOrderByDirective(order[fieldPath])
                    graphqlField.addDirective(orderByDirective)
                }
            }
            result.push(graphqlField)
        }
        return result
    }
}
