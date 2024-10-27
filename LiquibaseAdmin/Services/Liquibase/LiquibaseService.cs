using LiquibaseAdmin.Config.Models;
using LiquibaseAdmin.Configuration.Models;
using LiquibaseAdmin.Database;
using LiquibaseAdmin.Database.Models;
using LiquibaseAdmin.Lib.Di.Attributes;
using LiquibaseAdmin.Services.Liquibase.Commands.Base;
using LiquibaseAdmin.Services.Liquibase.Dto;
using LiquibaseAdmin.Services.Liquibase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using YamlDotNet.Serialization;

namespace LiquibaseAdmin.Services.Liquibase
{
    [AutoInject]
    public class LiquibaseService(IOptions<DatabaseConfig> databaseConfig, IOptions<LiquibaseConfig> liquibaseConfig, MainDbContext dbContext)
    {
        private readonly DatabaseConfig _databaseConfig = databaseConfig.Value;
        private readonly LiquibaseConfig _liquibaseConfig = liquibaseConfig.Value;
        private readonly MainDbContext _context = dbContext;

        private string DatabaseConnectionArgs => $"--url=jdbc:postgresql://{_databaseConfig.Host}:{_databaseConfig.Port}/{_databaseConfig.Database} --username={_databaseConfig.User} --password={_databaseConfig.Pass}";

        public async Task<ChangelogInfoDto[]> GetFullChangelogList()
        {
            var result = new List<ChangelogInfoDto>();

            var changelogs = await _context.Changelogs.OrderBy(p => p.OrderExecuted).ToListAsync();
            var changelogCopy = changelogs.ToArray();
            var rawChangelogs = (await GetRawChangelogs()).Where(p => p.LogicalFilePath != null && p.ContaisChagnes).ToArray();
            var dictionary = new Dictionary<string, LiqDatabaseChangelog>();
            for (int i = 0; i < changelogCopy.Length; i++)
            {
                if (!dictionary.ContainsKey(changelogCopy[i].FileName))
                {
                    dictionary.Add(changelogCopy[i].FileName, changelogCopy[i]);
                }
            }
            for (int i = 0; i < rawChangelogs.Length; i++)
            {
                var changelog = rawChangelogs[i];
                var dto = new ChangelogInfoDto()
                {
                    ChangeSets = changelog.ChangeSets,
                    LogicalFilePath = changelog.LogicalFilePath!
                };

                if (dictionary.TryGetValue(changelog.LogicalFilePath!, out LiqDatabaseChangelog? value))
                {
                    dto.DatabaseChangelog = value;
                }

                result.Add(dto);
            }
            result.Reverse();
            return result.ToArray();
        }

        public async Task<ChangelogModel[]> GetRawChangelogs()
        {
            var files = Directory.GetFiles(_liquibaseConfig.ChangelogDir, "*.yaml", SearchOption.AllDirectories);
            var result = new ChangelogModel[files.Length];
            for (int i = 0; i < files.Length; i++)
            {
                var file = files[i];
                var content = await File.ReadAllTextAsync(file);
                var data = new DeserializerBuilder().Build().Deserialize<ChangelogModel>(content);
                result[i] = data;
            }
            return result;
        }

        public async Task<string> GetChangelogContentByName(string name)
        {
            var files = Directory.GetFiles(_liquibaseConfig.ChangelogDir, "*.yaml", SearchOption.AllDirectories);
            for (int i = 0; i < files.Length; i++)
            {
                var file = files[i];
                var content = await File.ReadAllTextAsync(file);
                var data = new DeserializerBuilder().Build().Deserialize<ChangelogModel>(content);
                if (data.DatabasechangeLog == null)
                {
                    continue;
                }

                var path = "";

                for (int j = 0; j < data.DatabasechangeLog.Length; j++)
                {
                    var item = data.DatabasechangeLog[j];
                    if (item.LogicalFilePath != null)
                    {
                        path = item.LogicalFilePath;
                    }
                }

                if (string.IsNullOrEmpty(path))
                {
                    path = file.Replace($"{_liquibaseConfig.ChangelogDir}/", "");
                }
                if (path == name)
                {
                    return content;
                }
            }
            return "";
        }

        public async Task<CommandResultDto> RunLiquibaseCommand(LiquibaseCommandBase command)
        {
            return await RunLiquibaseProcess(command.ToString());
        }

        private async Task<CommandResultDto> RunLiquibaseProcess(string command)
        {
            var process = new Process();
            process.StartInfo.WorkingDirectory = _liquibaseConfig.ChangelogDir;
            process.StartInfo.FileName = "liquibase";
            process.StartInfo.Arguments = $"--changeLogFile={_liquibaseConfig.ChangelogEntryFile} {DatabaseConnectionArgs} {command}";
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;

            process.Start();

            var result = process.StandardOutput.ReadToEnd();
            var error = process.StandardError.ReadToEnd();
            await process.WaitForExitAsync();

            return new CommandResultDto()
            {
                Result = result,
                Error = error
            };
        }
    }
}
