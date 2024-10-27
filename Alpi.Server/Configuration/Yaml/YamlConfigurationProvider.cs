using Microsoft.Extensions.Configuration;
using YamlDotNet.Core;

namespace Alpi.Server.Configuration.Yaml
{
    /// <summary>
    /// A YAML file based <see cref="FileConfigurationProvider"/>.
    /// </summary>
    public class YamlConfigurationProvider : FileConfigurationProvider
    {
        public YamlConfigurationProvider(YamlConfigurationSource source) : base(source) { }

        public override void Load(Stream stream)
        {
            var parser = new YamlConfigurationFileParser();
            try
            {
                Data = parser.Parse(stream);
            }
            catch (YamlException e)
            {
                throw new FormatException("Parse error " + e.Message);
            }
        }
    }
}
