using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Jwt
{
    public class JwtBuilder
    {
        private List<Claim> _claims;
        private TimeSpan? _expires;
        private JwtOptionsBase _options;

        private JwtBuilder(JwtOptionsBase options)
        {
            _claims = new List<Claim>();
            _options = options;
        }


        public static JwtBuilder Create(JwtOptionsBase options)
        {
            return new JwtBuilder(options);
        }

        public JwtBuilder AddClaim(string type, string value)
        {
            _claims.Add(new Claim(type, value));
            return this;
        }

        public JwtSecurityToken GetJwt()
        {
            DateTime now = DateTime.UtcNow;

            DateTime expires = now.Add(TimeSpan.FromMinutes(_options.LifeTime));

            JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: _options.Issuer,
                    audience: _options.Audience,
                    notBefore: now,
                    claims: _claims,
                    expires: expires,
                    signingCredentials: new SigningCredentials(_options.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            return jwt;
        }

        public string GetToken()
        {
            JwtSecurityToken jwt = GetJwt();
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
