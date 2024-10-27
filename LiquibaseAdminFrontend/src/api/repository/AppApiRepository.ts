import { RepoEntityStatic } from '@i-app/api-entity-repo/lib/entity'
import { RepoEntityBase, RestApiRepository } from '@i-app/api-entity-repo'
import { ApiErrorHandler } from '@/lib/entityRepo/models/ApiErrorHandler'
import { AppEnvironment } from '@/config/AppEnvironment'

export class AppApiRepository<T extends RepoEntityBase> extends RestApiRepository<T> {
    constructor(
        entityConstructor: RepoEntityStatic<T>,
        path: string,
        protected readonly errorHandler?: ApiErrorHandler,
    ) {
        super(entityConstructor, path, {
            timeout: 20000,
        })
        this.service.defaults.baseURL = AppEnvironment.AppApi
    }
}
