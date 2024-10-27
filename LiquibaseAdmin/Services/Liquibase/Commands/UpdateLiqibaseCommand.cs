using LiquibaseAdmin.Services.Liquibase.Commands.Base;

namespace LiquibaseAdmin.Services.Liquibase.Commands
{
    public class UpdateLiqibaseCommand(bool sql = false) : LiquibaseSqlSubversionCommandBase(sql)
    {
        public override string Name => "update";

        public override string Params => "";
    }
}
