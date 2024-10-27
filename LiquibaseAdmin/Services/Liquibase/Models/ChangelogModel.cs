using YamlDotNet.Serialization;

namespace LiquibaseAdmin.Services.Liquibase.Models
{
    public class ChangelogModel
    {
        public string? LogicalFilePath => DatabasechangeLog.FirstOrDefault(p => p.LogicalFilePath != null)?.LogicalFilePath;

        public bool ContaisChagnes => DatabasechangeLog.FirstOrDefault(p => p.ChangeSet != null) != null;

        public ChangelogChangeSet[] ChangeSets => DatabasechangeLog.Select(p => p.ChangeSet).Where(p => p!= null).ToArray();

        [YamlMember(Alias = "databaseChangeLog")]
        public ChangelogItem[] DatabasechangeLog { get; set; }
    }
}
