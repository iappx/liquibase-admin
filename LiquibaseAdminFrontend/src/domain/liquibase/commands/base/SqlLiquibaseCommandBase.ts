import { ILiquibaseCommand } from '@/domain/liquibase/commands/interfaces/ILiquibaseCommand'
import { Constructor } from '@/lib/types/Constructor'

export abstract class SqlLiquibaseCommandBase implements ILiquibaseCommand {
    abstract readonly name: string

    constructor(
        protected readonly sql = true,
        protected readonly args?: Record<string, any>,
    ) {
    }

    getArgs(force = false): Record<string, any> {
        return {
            sql: force ? false : this.sql,
            ...(this.args || {}),
        }
    }
}
