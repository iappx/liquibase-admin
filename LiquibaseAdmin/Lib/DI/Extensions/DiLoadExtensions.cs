using LiquibaseAdmin.Lib.Di.Attributes;
using System.Reflection;

namespace LiquibaseAdmin.Lib.Di.Extensions
{
    public static class DiLoadExtensions
    {
        public static void RegisterAutoinjections(this IServiceCollection services, Assembly assembly)
        {
            IEnumerable<Type> types = assembly.GetTypes().Where(p => p.GetCustomAttribute<AutoInjectAttribute>() != null);
            foreach (Type type in types)
            {
                AutoInjectAttribute? attribute = type.GetCustomAttribute<AutoInjectAttribute>();
                if (attribute != null)
                {
                    switch (attribute.InjectionScope)
                    {
                        case DI.Enum.InjectionScope.Scoped:
                            services.AddScoped(type);
                            break;
                        case DI.Enum.InjectionScope.Singleton:
                            services.AddSingleton(type);
                            break;
                    }
                }
            }
        }

        public static void RegisterAutoinjections(this IServiceCollection services, Assembly[] assemblies)
        {
            for (int i = 0; i < assemblies.Length; i++)
            {
                services.RegisterAutoinjections(assemblies[i]);
            }
        }
    }
}
