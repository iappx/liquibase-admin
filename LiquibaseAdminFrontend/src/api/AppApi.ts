import { ApiEntityRepo } from '@i-app/api-entity-repo/lib/ApiEntityRepo'
import { EntityContextBase } from '@i-app/api-entity-repo'
import { AppApiEndpoints } from '@/api/AppApiEndpoints'
import { Constructor } from '@/lib/types/Constructor'
import { ApiErrorHandler } from '@/lib/entityRepo/models/ApiErrorHandler'
import { AppApiContext } from '@/api/context/AppApiContext'
import { AppApiRepositoryBuilder } from '@/api/repository/AppApiRepositoryBuilder'


export class AppApi {
    public readonly apiEndpoints: AppApiEndpoints

    private readonly apiEntityRepo: ApiEntityRepo

    public constructor(
        private readonly errorHandler?: ApiErrorHandler,
    ) {
        this.apiEntityRepo = ApiEntityRepo.create()
            .use(AppApiContext, new AppApiRepositoryBuilder(errorHandler))

        this.apiEndpoints = new AppApiEndpoints()
    }

    public static create(errorHandler?: ApiErrorHandler): AppApi {
        return new AppApi(errorHandler)
    }

    public getContext<T extends EntityContextBase>(context: Constructor<T>): T {
        return this.apiEntityRepo.getContext<T>(context)
    }
}
