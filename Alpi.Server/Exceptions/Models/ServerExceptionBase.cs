using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Exceptions.Models
{
    public abstract class ServerExceptionBase : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public int Code { get; set; }
    }
}
