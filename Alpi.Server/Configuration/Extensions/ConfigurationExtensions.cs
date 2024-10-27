using Alpi.Server.Configuration.Attributes;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace Alpi.Server.Configuration.Extensions
{
    public static class ConfigurationExtensions
    {
        public static T? GetEntity<T>(this IConfiguration configuration) where T : class
        {
            string? section = typeof(T).GetCustomAttribute<ConfigOptionAttribute>()?.SectionName;
            if (!string.IsNullOrWhiteSpace(section))
            {
                return configuration.GetSection(section!).Get<T>();
            }

            return null;
        }

        public static T GetEntityStrict<T>(this IConfiguration configuration) where T : class
        {
            T? entity = null;
            string? section = typeof(T).GetCustomAttribute<ConfigOptionAttribute>()?.SectionName;
            if (!string.IsNullOrWhiteSpace(section))
            {
                entity = configuration.GetSection(section!).Get<T>();
            }

            if (entity == null)
            {
                throw new Exception($"Config section \"{section}\" not found");
            }
            return entity;
        }
    }
}
