import { SqlLiquibaseCommandBase } from '@/domain/liquibase/commands/base/SqlLiquibaseCommandBase'

export class RollbackCountLiquibaseCommand extends SqlLiquibaseCommandBase {
    public readonly name = 'rollback-count'

    constructor(
        private readonly count: number,
        sql = true,
    ) {
        super(sql, { count })
    }
}
