import { IRepository, IRepositoryBuilder, RepoEntityBase, RepoEntityStatic } from '@i-app/api-entity-repo'
import { AxiosRequestConfig } from 'axios'
import { GqlApiRepository } from '@/lib/entityRepo/graphql/repository/GqlApiRepository'
import { TGqlApiRepositoryParams } from '@/lib/entityRepo/graphql/entitySet/types/TGqlApiRepositoryParams'


export abstract class GqlApiRepositoryBuilder implements IRepositoryBuilder<TGqlApiRepositoryParams> {
    constructor(
        protected readonly baseUrl: string,
        protected readonly config?: AxiosRequestConfig,
    ) {
    }

    build<T extends RepoEntityBase>(entityConstructor: RepoEntityStatic<T>, params: TGqlApiRepositoryParams): IRepository<T> {
        return new GqlApiRepository(entityConstructor, params.entityName, {
            baseURL: this.baseUrl,
            ...this.config,
        })
    }
}
