using YamlDotNet.Serialization;

namespace LiquibaseAdmin.Services.Liquibase.Models
{
    public class ChangelogItem
    {
        [YamlMember(Alias = "logicalFilePath")]
        public string LogicalFilePath { get; set; }

        [YamlMember(Alias = "include")]
        public object Include { get; set; }

        [YamlMember(Alias = "changeSet")]
        public ChangelogChangeSet ChangeSet { get; set; }

        [YamlMember(Alias = "includeAll")]
        public object IncludeAll { get; set; }
    }
}
