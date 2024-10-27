import { Identifier, IRepository, PaginatedData, RepoEntityBase, RepoEntityStatic } from '@i-app/api-entity-repo'
import { AxiosRequestConfig } from 'axios'
import { GqlApiEndpoint } from '@/lib/entityRepo/graphql/endpoint/GqlApiEndpoint'
import { FilterOperationsEnum } from '@/lib/entityRepo/enum/FilterOperationsEnum'
import { ArrayHelper } from '@/lib/utils/ArrayHelper'
import { GraphqlPaginatedQuery } from '@/lib/entityRepo/graphql/queries/GraphqlPaginatedQuery'
import { GraphqlQuery } from '@/lib/entityRepo/graphql/models/GraphqlQuery'
import { GraphqlMutation } from '@/lib/entityRepo/graphql/mutations/GraphqlMutation'
import { GraphqlEntity } from '@/lib/entityRepo/graphql/entity/GraphqlEntity'
import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'
import { GraphqlObjectValue } from '@/lib/entityRepo/graphql/models/values/GraphqlObjectValue'
import { GraphqlField } from '@/lib/entityRepo/graphql/models/GraphqlField'
import { GraphqlPlainValue } from '@/lib/entityRepo/graphql/models/values/GraphqlPlainValue'

export type TGqlFilterItem = { operation: FilterOperationsEnum, value: string | string[] }

export type TGqlOrderByItem = {
    field: string
    direction: 'ASC' | 'DESC'
    index: number
}

export type TGqlRepositoryConfig = AxiosRequestConfig & {
    orderBy?: TGqlOrderByItem[],
    filter?: Record<string, TGqlFilterItem[]>
    include?: RepoEntityStatic<any>[],
    excludeFields?: string[],
    args?: GraphqlArg[]
}

export class GqlApiRepository<T extends RepoEntityBase> extends GqlApiEndpoint implements IRepository<T, TGqlRepositoryConfig> {

    protected readonly entityName: string
    protected readonly capitalizedEntityName: string

    constructor(
        protected readonly entityConstructor: RepoEntityStatic<T>,
        entityName: string,
        config?: TGqlRepositoryConfig,
    ) {
        super(config || {})
        this.entityName = entityName
        this.capitalizedEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1)
    }

    async create(entity: T, params?: TGqlRepositoryConfig): Promise<T> {
        const mutationName = 'create' + this.capitalizedEntityName
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields(params)
        const graphqlMutation = new GraphqlMutation(mutationName, graphqlFields)
        graphqlMutation.addArg('input', GraphqlObjectValue.fromObject(entity.getDataValues()))
        const mutation = graphqlMutation.toGraphql()
        const response = await this.graphQlQuery<T>(mutation, mutationName)
        if (response[mutationName]) {
            const entityData = response[mutationName]
            entity.setDataValues(entityData)
        }
        return entity
    }

    async delete(entity: T, params?: TGqlRepositoryConfig): Promise<void> {
        await this.deleteItem(entity.getPkValue(), params)
    }

    async deleteByPk(pk: Identifier, params?: TGqlRepositoryConfig): Promise<void> {
        await this.deleteItem(pk, params)
    }

    async getAll(params?: TGqlRepositoryConfig): Promise<T[]> {
        const orderMap = ArrayHelper.createMap(params?.orderBy || [], 'field')
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields({
            filter: params?.filter,
            order: orderMap,
            excludeFields: params?.excludeFields,
        })
        const graphQlQuery = new GraphqlQuery(this.entityName, graphqlFields)
        if (params?.args) {
            graphQlQuery.addArgs(...params.args)
        }
        const query = graphQlQuery.toGraphql()
        const response = await this.graphQlQuery<T[]>(query, 'getAll' + this.capitalizedEntityName)
        if (response[this.entityName]) {
            const entityArray = response[this.entityName]
            if (!Array.isArray(entityArray)) {
                throw new Error('Entity is not array')
            }
            return entityArray.map(p => this.buildEntity(p))
        }
        throw new Error('Entity not found')
    }

    async getOne(params?: TGqlRepositoryConfig): Promise<T> {
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields(params)
        const graphQlQuery = new GraphqlQuery(this.entityName, graphqlFields)
        if (params?.args) {
            graphQlQuery.addArgs(...params.args)
        }
        const query = graphQlQuery.toGraphql()
        const response = await this.graphQlQuery<T[]>(query, 'getOne' + this.capitalizedEntityName)
        if (response[this.entityName]) {
            const entity = response[this.entityName]
            if (Array.isArray(entity)) {
                throw new Error('Entity is array')
            }
            return this.buildEntity(entity)
        }
        throw new Error('Entity not found')
    }

    async getByPk(pk: Identifier, params?: TGqlRepositoryConfig): Promise<T> {
        const queryName = this.entityName + 'ByPk'
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields(params)
        const graphQlQuery = new GraphqlQuery(queryName, graphqlFields)
        graphQlQuery.addArgs(
            new GraphqlArg('input', new GraphqlObjectValue({
                id: new GraphqlPlainValue(pk),
            })),
        )
        if (params?.args) {
            graphQlQuery.addArgs(...params.args)
        }
        const query = graphQlQuery.toGraphql()
        const response = await this.graphQlQuery<T[]>(query, 'getByPk' + this.capitalizedEntityName)
        if (response[queryName]) {
            const entity = response[queryName]
            if (Array.isArray(entity)) {
                throw new Error('Entity is array')
            }
            return this.buildEntity(entity)
        }
        throw new Error('Entity not found')
    }

    async paginate(page: number, limit: number, params?: TGqlRepositoryConfig): Promise<PaginatedData<T>> {
        const orderBy = params?.orderBy || []
        const orderMap = ArrayHelper.createMap(orderBy, 'field')
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields({
            filter: params?.filter,
            order: orderMap,
            excludeFields: params?.excludeFields,
        })
        const paginatedQuery = GraphqlPaginatedQuery.create(this.entityName, graphqlFields, page, limit)
        if (params?.args) {
            paginatedQuery.addArgs(...params.args)
        }
        const graphqlQuery = paginatedQuery.toGraphql()
        const response = await this.graphQlQuery<T[]>(graphqlQuery, 'paginate' + this.capitalizedEntityName)
        if (response[this.entityName]) {
            const entityArray = response[this.entityName].list
            if (!Array.isArray(entityArray)) {
                throw new Error('Entity is not array')
            }
            const list = entityArray.map(p => this.buildEntity(p)) as any
            return new PaginatedData(list, response[this.entityName].paginationInfo.total)
        }
        throw new Error('Entity not found')
    }

    async save(entity: T, params?: TGqlRepositoryConfig): Promise<T> {
        const mutationName = 'update' + this.capitalizedEntityName
        const attributeMap = this.entityConstructor.prototype._attributeInfo
        const attributes = Object.keys(attributeMap)
        const entityValues = entity.getDataValues()
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i]
            if (attributeMap[attribute].nestedType || attributeMap[attribute].isPrimaryKey) {
                delete entityValues[attribute]
            }
        }
        const graphqlEntity = new GraphqlEntity(this.entityConstructor)
        const graphqlFields = graphqlEntity.getFields(params)
        const graphqlMutation = new GraphqlMutation(mutationName, graphqlFields)
        graphqlMutation.addArg('input', GraphqlObjectValue.fromObject(entityValues))
        graphqlMutation.addArg('id', new GraphqlPlainValue(entity.getPkValue()))
        const mutation = graphqlMutation.toGraphql()
        const response = await this.graphQlQuery<T>(mutation, mutationName)
        if (response[mutationName]) {
            const entityData = response[mutationName]
            entity.setDataValues(entityData)
        }
        return entity
    }

    protected buildEntity(data: Record<string, any>): T {
        const instance = new this.entityConstructor()
        instance.setDataValues(data)
        return instance
    }

    private async deleteItem(pk: Identifier, params?: TGqlRepositoryConfig): Promise<void> {
        const mutationName = 'delete' + this.capitalizedEntityName
        const mutation = new GraphqlMutation(mutationName, [
            new GraphqlField('success'),
        ])
        mutation.addArg('id', new GraphqlPlainValue(pk))
        await this.graphQlQuery(mutation.toGraphql(), mutationName)
    }
}
