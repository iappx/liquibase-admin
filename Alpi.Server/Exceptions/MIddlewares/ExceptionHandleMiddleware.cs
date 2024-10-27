using Alpi.Server.Exceptions.Models;
using Alpi.Server.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Exceptions.MIddlewares
{
    public class ExceptionHandleMiddleware
    {
        private readonly RequestDelegate next;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        public ExceptionHandleMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next.Invoke(context).ConfigureAwait(false);
            }
            catch (HttpRequestException ex)
            {
                context.Response.StatusCode = ((int?)ex.StatusCode) ?? 400;
                context.Response.Headers.ContentType = "application/json";
                byte[] body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(new DefaultServerError()
                {
                    Code = (int)ex.StatusCode,
                    Message = ex.Message,
                }));
                await context.Response.Body.WriteAsync(body).ConfigureAwait(false);
            }
            catch (ServerExceptionBase ex)
            {
                context.Response.StatusCode = ((int?)ex.StatusCode) ?? 500;
                context.Response.Headers.ContentType = "application/json";
                byte[] body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(new DefaultServerError()
                {
                    Code = (int)ex.StatusCode,
                    Message = ex.Message,
                }));
                await context.Response.Body.WriteAsync(body).ConfigureAwait(false);
            }
        }
    }
}
