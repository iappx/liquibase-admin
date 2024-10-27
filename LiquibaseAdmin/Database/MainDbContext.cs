using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using LiquibaseAdmin.Configuration.Models;
using LiquibaseAdmin.Database.Models;

namespace LiquibaseAdmin.Database
{
    public class MainDbContext : DbContext
    {
        public DbSet<LiqDatabaseChangelog> Changelogs { get; set; }

        public MainDbContext(DbContextOptions<MainDbContext> options, IOptions<DatabaseConfig> databaseOptions) : base(options)
        {
        }
    }
}
