using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class OrdemServicoController : BaseController
    {
        private readonly IOrdemServicoApplicationService _service;

        public OrdemServicoController(IOrdemServicoApplicationService service)
        {
            this._service = service;
        }

        [HttpGet]
        //[Authorize]
        [Route("api/ordemServico/listAll")]
        public Task<HttpResponseMessage> Get()
        {
            var ordemServicos = _service.Get();
            return CreateResponse(HttpStatusCode.OK, ordemServicos);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/ordemServico/{skip:int:min(0)}/{take:int:min(1)}")]
        public Task<HttpResponseMessage> GetByRange(int skip, int take)
        {
            var ordemServicos = _service.Get(skip, take);
            return CreateResponse(HttpStatusCode.OK, ordemServicos);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/update")]
        public Task<HttpResponseMessage> Put(OrdemServico ordemServico)
        {
            var ordemServicoCreate = _service.Update(ordemServico);
            return CreateResponse(HttpStatusCode.OK, ordemServicoCreate);
        }

        [HttpDelete]
        //[Authorize]
        [Route("api/ordemServico/delete/{id}")]
        public Task<HttpResponseMessage> Delete(int id)
        {
            var ordemServico = _service.Delete(id);
            return CreateResponse(HttpStatusCode.OK, ordemServico);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/deleteAlot")]
        public Task<HttpResponseMessage> DeleteAlot(List<OrdemServico> ordemServico)
        {
            var OrdemServicos = _service.DeleteAlot(ordemServico);
            return CreateResponse(HttpStatusCode.OK, OrdemServicos);
        }
    }
}