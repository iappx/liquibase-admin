using Alpi.Server.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alpi.Server.Models
{
    public class DefaultServerResponse<TPayload, TError> : IServerResponse
    {
        public bool Success { get; set; }
        public TPayload? Payload { get; set; }
        public TError? Error { get; set; }
    }
}
