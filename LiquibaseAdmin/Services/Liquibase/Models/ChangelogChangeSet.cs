using YamlDotNet.Serialization;

namespace LiquibaseAdmin.Services.Liquibase.Models
{
    public class ChangelogChangeSet
    {
        [YamlMember(Alias = "id")]
        public string Id { get; set; }

        [YamlMember(Alias = "author")]
        public string Author { get; set; }

        [YamlMember(Alias = "changes")]
        public object Changes { get; set; }

        [YamlMember(Alias = "rollback")]
        public object Rollback { get; set; }

        [YamlMember(Alias = "preConditions")]
        public object PreConditions { get; set; }
    }
}
