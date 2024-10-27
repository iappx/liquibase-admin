import { EntitySet } from './EntitySet'
import { Identifier, PaginatedData } from '@i-app/api-entity-repo'
import { RouteParamsRequestConfig } from '@/lib/entityRepo/models/RouteParamsRequestConfig'
import {
    TGqlFilterItem,
    TGqlOrderByItem,
    TGqlRepositoryConfig,
} from '@/lib/entityRepo/graphql/repository/GqlApiRepository'
import { FilterOperationsEnum } from '@/lib/entityRepo/enum/FilterOperationsEnum'
import { GraphqlArg } from '@/lib/entityRepo/graphql/models/GraphqlArg'

export class EntityQueryBuilder<T, TGetParams extends {} = never, TRouteParams extends {} = never> {
    private orderByData: TGqlOrderByItem[] = []
    private filterData: Record<string, TGqlFilterItem[]> = {}
    private args: GraphqlArg[] = []
    private excludedFields: string[] = []

    constructor(
        public readonly entitySet: EntitySet<any>,
    ) {
    }

    public clearOrderByData(): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        this.orderByData = []
        return this
    }

    public orderBy(field: string, direction: 'ASC' | 'DESC', index = 0): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        this.orderByData.push({
            field,
            direction,
            index,
        })
        return this
    }

    public filter(field: string, operation: FilterOperationsEnum, value: string | string[]): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        if (!this.filterData[field]) {
            this.filterData[field] = []
        }
        this.filterData[field].push({
            operation,
            value,
        })
        return this
    }

    public addArg(arg: GraphqlArg): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        this.args.push(arg)
        return this
    }

    public excludeFields(...fields: string[]): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        this.excludedFields.push(...fields)
        return this
    }

    public copy(): EntityQueryBuilder<T, TGetParams, TRouteParams> {
        const res = new EntityQueryBuilder<T, TGetParams, TRouteParams>(this.entitySet)
        res.orderByData = [...this.orderByData]
        res.filterData = { ...this.filterData }
        res.args = [...this.args]
        res.excludedFields = [...this.excludedFields]
        return res
    }

    async create(entity: T): Promise<void> {
        return this.entitySet.create(entity, this.createParams())
    }

    async delete(entity: T): Promise<void> {
        return this.entitySet.delete(entity, this.createParams())
    }

    async deleteByPk(pk: Identifier): Promise<void> {
        return this.entitySet.deleteByPk(pk, this.createParams())
    }

    async getAll(): Promise<T[]> {
        return this.entitySet.getAll(this.createParams())
    }

    async getOne(): Promise<T> {
        return this.entitySet.getOne(this.createParams())
    }

    async paginate(page: number, limit: number, params?: RouteParamsRequestConfig): Promise<PaginatedData<T>> {
        return this.entitySet.paginate(page, limit, this.createParams(params))
    }

    public async loadAllFromPaginated(addItemsHandler?: (...params: any[]) => void, batchSize = 100): Promise<T[]> {
        const resultArray: T[] = []
        let loadedTotal = 0
        let itemsTotal = 1
        let page = 0

        while (loadedTotal < itemsTotal) {
            const items = await this.paginate(page, batchSize)
            itemsTotal = items.total

            resultArray.push(...items.list)
            if (addItemsHandler) {
                addItemsHandler(items.list)
            }

            page++
            loadedTotal += items.list.length
        }
        return resultArray
    }

    async getByPk(pk: Identifier): Promise<T> {
        return this.entitySet.getByPk(pk, this.createParams())
    }

    async save(entity: T): Promise<void> {
        return this.entitySet.save(entity, this.createParams())
    }

    private createParams(initial?: TGqlRepositoryConfig): TGqlRepositoryConfig {
        const config: TGqlRepositoryConfig = initial || {}
        if (this.orderByData) {
            config.orderBy = this.orderByData
        }
        if (this.filterData) {
            config.filter = this.filterData
        }
        if (this.args) {
            config.args = this.args
        }
        if (this.excludedFields) {
            config.excludeFields = this.excludedFields
        }
        return config
    }
}
