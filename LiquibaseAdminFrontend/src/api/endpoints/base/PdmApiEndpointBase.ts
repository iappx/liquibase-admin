import { AppEnvironment } from '@/config/AppEnvironment'
import { ApiErrorHandler } from '@/lib/entityRepo/models/ApiErrorHandler'
import { ApiEndpoint } from '@i-app/api-entity-repo'

export abstract class PdmApiEndpointBase extends ApiEndpoint {
    constructor(
        protected readonly errorHandler?: ApiErrorHandler,
    ) {
        super({
            baseURL: AppEnvironment.AppApi,
            timeout: 20000,
        })
    }
}
