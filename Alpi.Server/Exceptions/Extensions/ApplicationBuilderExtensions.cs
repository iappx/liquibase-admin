using Alpi.Server.Exceptions.MIddlewares;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        public static void UseExceptionHandling(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<ExceptionHandleMiddleware>();
        }
    }
}
