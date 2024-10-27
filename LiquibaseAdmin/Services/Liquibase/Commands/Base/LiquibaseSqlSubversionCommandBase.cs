namespace LiquibaseAdmin.Services.Liquibase.Commands.Base
{
    public abstract class LiquibaseSqlSubversionCommandBase(bool sql = false) : LiquibaseCommandBase
    {
        public virtual string SqlName => Name + "Sql";

        public override string ToString()
        {
            if (sql)
            {
                return $"{SqlName} {CommanOptions}";
            }
            return base.ToString();
        }
    }
}
