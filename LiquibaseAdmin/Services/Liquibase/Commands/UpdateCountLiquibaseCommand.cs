using LiquibaseAdmin.Services.Liquibase.Commands.Base;

namespace LiquibaseAdmin.Services.Liquibase.Commands
{
    public class UpdateCountLiquibaseCommand(int count, bool sql = false) : LiquibaseSqlSubversionCommandBase(sql)
    {
        public override string Name => "updateCount";

        public override string Params => count.ToString();
    }
}
