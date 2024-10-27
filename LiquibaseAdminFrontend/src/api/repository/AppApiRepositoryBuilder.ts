import { IRepository, RepoEntityBase, RestApiRepositoryBuilderBase } from '@i-app/api-entity-repo'
import { RepoEntityStatic } from '@i-app/api-entity-repo/lib/entity'
import { ApiErrorHandler } from '@/lib/entityRepo/models/ApiErrorHandler'
import { AppApiRepository } from '@/api/repository/AppApiRepository'
import { RestApiRepositoryBuilderParams } from '@i-app/api-entity-repo/lib/api/repository/types'
import { AppEnvironment } from '@/config/AppEnvironment'

export class AppApiRepositoryBuilder extends RestApiRepositoryBuilderBase {
    constructor(
        protected readonly errorHandler?: ApiErrorHandler,
    ) {
        super(AppEnvironment.AppApi)
    }

    build<T extends RepoEntityBase>(entityConstructor: RepoEntityStatic<T>, params: RestApiRepositoryBuilderParams): IRepository<T> {
        return new AppApiRepository(entityConstructor, params.endpointUrl || '', this.errorHandler)
    }
}
