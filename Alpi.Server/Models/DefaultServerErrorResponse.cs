using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Models
{
    public class DefaultServerErrorResponse : DefaultServerResponse<object, DefaultServerError>
    {
        public DefaultServerErrorResponse()
        {
            Success = false;
        }
    }
}
