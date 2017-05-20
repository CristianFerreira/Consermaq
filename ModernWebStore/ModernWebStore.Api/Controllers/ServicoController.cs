using ModernWebStore.Domain.Commands.OrderCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class ServicoController : BaseController
    {
        private readonly IServicoApplicationService _service;

        public ServicoController(IServicoApplicationService service)
        {
            this._service = service;
        }

        //[HttpPost]
        //[Authorize]
        //[Route("api/servico/create")]
        //public Task<HttpResponseMessage> Post(Servico servico)
        //{         
        //    var order = _service.Create(servico);
        //    return CreateResponse(HttpStatusCode.Created, order);
        //}
    }
}