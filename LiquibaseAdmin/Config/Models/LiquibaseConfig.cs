using Alpi.Server.Configuration.Attributes;

namespace LiquibaseAdmin.Config.Models
{
    [ConfigOption("Liquibase")]
    public class LiquibaseConfig
    {
        public string ChangelogDir { get; set; }
        public string ChangelogEntryFile { get; set; }
    }
}
