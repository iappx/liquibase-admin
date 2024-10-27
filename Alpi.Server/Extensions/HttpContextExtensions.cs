using Microsoft.AspNetCore.Http;

namespace Alpi.Server.Extensions
{
    public static class HttpContextExtensions
    {
        /// <summary>
        /// Возвращает значение заданного типа из <see cref="HttpContext"/>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="context"></param>
        /// <returns>Значение</returns>
        public static T? Get<T>(this HttpContext context)
        {
            return context.Get<T>(GetName<T>());
        }

        /// <summary>
        /// Возвращает значение заданного типа из <see cref="HttpContext"/>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="context"></param>
        /// <param name="name"></param>
        /// <returns>Значение</returns>
        public static T? Get<T>(this HttpContext context, string name)
        {
            return context.Items.ContainsKey(name) ? (T?)context.Items[name] : default;
        }

        /// <summary>
        /// Устанавливает значение заданного типа в <see cref="HttpContext"/>
        /// </summary>
        /// <typeparam name="T">Тип значения</typeparam>
        /// <param name="context"></param>
        /// <param name="value">Значение</param>
        public static void Set<T>(this HttpContext context, T value)
        {
            context.Set(value, GetName<T>());
        }

        /// <summary>
        /// Устанавливает значение заданного типа в <see cref="HttpContext"/>
        /// </summary>
        /// <typeparam name="T">Тип значения</typeparam>
        /// <param name="context"></param>
        /// <param name="value">Значение</param>
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
