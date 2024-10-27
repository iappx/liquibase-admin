import { ApiErrorHandler } from '@/lib/entityRepo/models/ApiErrorHandler'
import { LiquibaseCommandsEndpoint } from '@/api/endpoints/LiquibaseCommandsEndpoint'

export class AppApiEndpoints {
    public readonly liquibaseCommands: LiquibaseCommandsEndpoint

    constructor(errorHandler?: ApiErrorHandler) {
        this.liquibaseCommands = new LiquibaseCommandsEndpoint(errorHandler)
    }
}
