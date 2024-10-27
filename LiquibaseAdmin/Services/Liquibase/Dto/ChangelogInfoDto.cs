using LiquibaseAdmin.Database.Models;
using LiquibaseAdmin.Services.Liquibase.Models;

namespace LiquibaseAdmin.Services.Liquibase.Dto
{
    public class ChangelogInfoDto
    {
        public string LogicalFilePath { get; set; }

        public LiqDatabaseChangelog? DatabaseChangelog { get; set; }

        public ChangelogChangeSet[] ChangeSets { get; set; }
    }
}
