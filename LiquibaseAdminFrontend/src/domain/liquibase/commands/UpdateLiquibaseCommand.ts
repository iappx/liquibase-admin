import { SqlLiquibaseCommandBase } from '@/domain/liquibase/commands/base/SqlLiquibaseCommandBase'

export class UpdateLiquibaseCommand extends SqlLiquibaseCommandBase {
    public readonly name = 'update'
}
