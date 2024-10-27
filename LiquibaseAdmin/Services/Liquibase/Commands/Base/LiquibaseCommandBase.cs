namespace LiquibaseAdmin.Services.Liquibase.Commands.Base
{
    public abstract class LiquibaseCommandBase
    {
        public abstract string Name { get; }
        public abstract string Params { get; }

        public virtual string CommanOptions => Params;

        public override string ToString()
        {
            return $"{Name} {CommanOptions}";
        }
    }
}
