import { PdmApiEndpointBase } from '@/api/endpoints/base/PdmApiEndpointBase'
import { SqlLiquibaseCommandBase } from '@/domain/liquibase/commands/base/SqlLiquibaseCommandBase'

export type TLiquibaseCommandOutput = {
    result: string
    error: string
}

export type TRunLiquibaseResponse = {
    output: TLiquibaseCommandOutput
}

export class LiquibaseCommandsEndpoint extends PdmApiEndpointBase {
    public async runSqlCommand(command: SqlLiquibaseCommandBase, noSql = false): Promise<TRunLiquibaseResponse> {
        return this.postReq('/liquibase/command/' + command.name, {}, { params: command.getArgs(noSql) })
    }
}
