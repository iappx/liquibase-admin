using LiquibaseAdmin.Controllers.Liquibase.Dto.Response;
using LiquibaseAdmin.Database;
using LiquibaseAdmin.Database.Models;
using LiquibaseAdmin.Services.Liquibase;
using LiquibaseAdmin.Services.Liquibase.Dto;
using LiquibaseAdmin.Services.Liquibase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiquibaseAdmin.Controllers.Liquibase
{

    [ApiController]
    [Route("[controller]")]
    public class LiquibaseController : ControllerBase
    {
        private readonly MainDbContext _context;
        private readonly LiquibaseService _liquibaseService;

        public LiquibaseController(MainDbContext context, LiquibaseService liquibaseService)
        {
            _context = context;
            _liquibaseService = liquibaseService;
        }

        [HttpGet("db-changelog")]
        public async Task<ChangelogInfoDto[]> GetLiquibaseChangelogs()
        {
            return await _liquibaseService.GetFullChangelogList();
        }

        [HttpGet("db-changelog/{id}")]
        public async Task<DbChangelogFileDto> GetLiquibaseChangelogById([FromRoute] string id)
        {
            LiqDatabaseChangelog changelog = await _context.Changelogs.Where(p => p.Id == id).FirstAsync();

            string fileContent = await _liquibaseService.GetChangelogContentByName(changelog.FileName);

            DbChangelogFileDto dto = new DbChangelogFileDto()
            {
                Changelog = changelog,
                FileData = fileContent
            };

            return dto;
        }
    }
}
