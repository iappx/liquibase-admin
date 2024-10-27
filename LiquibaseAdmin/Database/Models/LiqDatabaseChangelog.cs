using System.ComponentModel.DataAnnotations.Schema;
using YamlDotNet.Core.Tokens;

namespace LiquibaseAdmin.Database.Models
{
    [Table("databasechangelog")]
    public class LiqDatabaseChangelog
    {
        [Column("id")]
        public string Id { get; set; }

        [Column("author")]
        public string Author { get; set; }

        [Column("filename")]
        public string FileName { get; set; }

        [Column("dateexecuted")]
        public DateTime DateExecuted { get; set; }

        [Column("orderexecuted")]
        public int OrderExecuted { get; set; }

        [Column("exectype")]
        public string ExecutionType { get; set; }

        [Column("description")]
        public string Description { get; set; }
    }
}
