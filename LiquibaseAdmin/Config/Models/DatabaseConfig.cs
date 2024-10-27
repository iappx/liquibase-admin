using Alpi.Server.Configuration.Attributes;

namespace LiquibaseAdmin.Configuration.Models
{
    [ConfigOption("Database")]
    public class DatabaseConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Database { get; set; }
        public string User { get; set; }
        public string Pass { get; set; }
        public bool RecreateDatabase { get; set; } = false;

        public string GetConnectionString()
        {
            return $"Host={Host};Port={Port};Database={Database};Username={User};Password={Pass}";
        }
    }
}
