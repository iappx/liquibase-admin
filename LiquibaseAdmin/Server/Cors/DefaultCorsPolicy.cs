using Microsoft.AspNetCore.Cors.Infrastructure;

namespace LiquibaseAdmin.Server.Cors
{
    public class DefaultCorsPolicy : CorsPolicy
    {
        public static string Name = nameof(DefaultCorsPolicy);

        public DefaultCorsPolicy(params string[] origins)
        {
            Headers.Add("*");
            Methods.Add("*");
            SupportsCredentials = true;
            PreflightMaxAge = TimeSpan.FromMinutes(1);
            for (int i = 0; i < origins.Length; i++)
            {
                string normalizedOrigin = GetNormalizedOrigin(origins[i]);
                Origins.Add(normalizedOrigin);
            }
        }

        internal static string GetNormalizedOrigin(string origin)
        {
            if (origin is null)
            {
                throw new ArgumentNullException(nameof(origin));
            }

            if (Uri.TryCreate(origin, UriKind.Absolute, out var uri) &&
                (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps) &&
                !string.Equals(uri.IdnHost, uri.Host, StringComparison.Ordinal))
            {
                var builder = new UriBuilder(uri.Scheme.ToLowerInvariant(), uri.IdnHost.ToLowerInvariant());
                if (!uri.IsDefaultPort)
                {
                    // Uri does not have a way to differentiate between a port value inferred by default (e.g. Port = 80 for http://www.example.com) and
                    // a default port value that is specified (e.g. Port = 80 for http://www.example.com:80). Although the HTTP or FETCH spec does not say
                    // anything about including the default port as part of the Origin header, at the time of writing, browsers drop "default" port when navigating
                    // and when sending the Origin header. All this goes to say, it appears OK to drop an explicitly specified port,
                    // if it is the default port when working with an IDN host.
                    builder.Port = uri.Port;
                }

                return builder.Uri.GetComponents(UriComponents.SchemeAndServer, UriFormat.Unescaped);
            }

            return origin.ToLowerInvariant();
        }
    }
}
