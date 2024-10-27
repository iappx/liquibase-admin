using LiquibaseAdmin.Database.Models;

namespace LiquibaseAdmin.Controllers.Liquibase.Dto.Response
{
    public class DbChangelogFileDto
    {
        public LiqDatabaseChangelog Changelog { get; set; }
        public string FileData { get; set; }
    }
}
