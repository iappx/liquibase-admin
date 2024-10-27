using Alpi.Server.Configuration.Attributes;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class AlpiServerConfigurationServicesExtensions
    {
        public static void LoadConfigurationEntities(this IServiceCollection services, IConfigurationRoot configuration, Assembly[] assemblies)
        {
            for (int i = 0; i < assemblies.Length; i++)
            {
                services.LoadConfigurationEntities(configuration, assemblies[i]);
            }
        }

        public static void LoadConfigurationEntities(this IServiceCollection services, IConfigurationRoot configuration, Assembly assembly)
        {
            Type[] types = assembly.GetTypes();
            Type[] configurationOptions = types.Where(p => p.GetCustomAttribute<ConfigOptionAttribute>() != null).ToArray();

            MethodInfo method = typeof(OptionsConfigurationServiceCollectionExtensions).GetMethods().First(p => p.GetParameters().Count() == 2);
            MethodInfo generic;
            string? section;
            for (int i = 0; i < configurationOptions.Length; i++)
            {
                section = configurationOptions[i].GetCustomAttribute<ConfigOptionAttribute>()?.SectionName;
                if (string.IsNullOrWhiteSpace(section))
                {
                    section = configurationOptions[i].Name;
                }
                generic = method.MakeGenericMethod(configurationOptions[i]);
                generic.Invoke(null, new object[] { services, configuration.GetSection(section) });
            }
        }
    }
}
