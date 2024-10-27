using Microsoft.AspNetCore.Http;

namespace Alpi.Server.Extensions
{
    public static class HttpContextExtensions
    {
        public static T? Get<T>(this HttpContext context)
        {
            return context.Get<T>(GetName<T>());
        }

        public static T? Get<T>(this HttpContext context, string name)
        {
            return context.Items.ContainsKey(name) ? (T?)context.Items[name] : default;
        }

        public static void Set<T>(this HttpContext context, T value)
        {
            context.Set(value, GetName<T>());
        }

        public static void Set<T>(this HttpContext context, T value, string name)
        {
            if (context.Items.ContainsKey(name))
            {
                context.Items[name] = value;
            }
            else
            {
                context.Items.Add(name, value);
            }
        }

        private static string GetName<T>()
        {
            return typeof(T).Name;
        }
    }
}
