using LiquibaseAdmin.Services.Liquibase.Commands.Base;

namespace LiquibaseAdmin.Services.Liquibase.Commands
{
    public class RollbackCountLiquibaseCommand(int count, bool sql = false) : LiquibaseSqlSubversionCommandBase(sql)
    {
        public override string Name => "rollbackCount";

        public override string Params => count.ToString();
    }
}
