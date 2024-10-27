import { SqlLiquibaseCommandBase } from '@/domain/liquibase/commands/base/SqlLiquibaseCommandBase'

export class UpdateCountLiquibaseCommand extends SqlLiquibaseCommandBase {
    public readonly name = 'update-count'

    constructor(
        private readonly count: number,
        sql = true,
    ) {
        super(sql, { count })
    }
}
