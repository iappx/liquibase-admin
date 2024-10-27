using LiquibaseAdmin.Controllers.Liquibase.Dto.Response;
using LiquibaseAdmin.Services.Liquibase;
using LiquibaseAdmin.Services.Liquibase.Commands;
using Microsoft.AspNetCore.Mvc;

namespace LiquibaseAdmin.Controllers.Liquibase.Command
{
    [ApiController]
    [Route("liquibase/command")]
    public class LiquibaseCommandController(LiquibaseService liquibaseService) : ControllerBase
    {
        private readonly LiquibaseService _liquibaseService = liquibaseService;

        [HttpPost("update")]
        public async Task<RunLiquiibaseDto> UpdateCommand([FromQuery] bool sql = true)
        {
            var command = new UpdateLiqibaseCommand(sql);
            var result = await _liquibaseService.RunLiquibaseCommand(command);
            return new RunLiquiibaseDto()
            {
                Output = result,
            };
        }

        [HttpPost("update-count")]
        public async Task<RunLiquiibaseDto> UpdateCountCommand([FromQuery] int count, [FromQuery] bool sql = true)
        {
            var command = new UpdateCountLiquibaseCommand(count, sql);
            var result = await _liquibaseService.RunLiquibaseCommand(command);
            return new RunLiquiibaseDto()
            {
                Output = result,
            };
        }

        [HttpPost("rollback-count")]
        public async Task<RunLiquiibaseDto> RollbackMigrations([FromQuery] int count, [FromQuery] bool sql = true)
        {
            var command = new RollbackCountLiquibaseCommand(count, sql);
            var result = await _liquibaseService.RunLiquibaseCommand(command);
            return new RunLiquiibaseDto()
            {
                Output = result,
            };
        }
    }
}
