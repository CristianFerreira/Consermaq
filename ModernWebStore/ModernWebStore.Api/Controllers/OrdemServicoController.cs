using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System;
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
        private readonly IClienteApplicationService _cliente;

        public OrdemServicoController(IOrdemServicoApplicationService service, IClienteApplicationService cliente)
        {
            this._service = service;
            this._cliente = cliente;
        }

        [HttpGet]
        //[Authorize]
        [Route("api/ordemServico/listAll")]
        public Task<HttpResponseMessage> Get()
        {
            var ordemServicos = _service.Get();
            foreach(var ordemServico in ordemServicos)
            {
                ordemServico.Cliente.OrdemServicos = null;
            }
            return CreateResponse(HttpStatusCode.OK, ordemServicos);
        }

        
        [HttpGet]
        //[Authorize]
        [Route("api/ordemServico/listAllCanceled")]
        public Task<HttpResponseMessage> listAllCanceled()
        {
            var ordemServicos = _service.listAllCanceled();
            foreach (var ordemServico in ordemServicos)
            {
                ordemServico.Cliente.OrdemServicos = null;
            }
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

        [HttpGet]
        //[Authorize]
        [Route("api/ordemServico/getById/{id}")]
        public Task<HttpResponseMessage> Get(int id)
        {
            var ordemServico = _service.Get(id);
            return CreateResponse(HttpStatusCode.Created, ordemServico);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/create")]
        public Task<HttpResponseMessage> Post(OrdemServico ordemServico)
        {
            var ordemServicoCreate = _service.Create(ordemServico);
            ordemServicoCreate.Cliente = _cliente.Get(ordemServicoCreate.ClienteId);
            return CreateResponse(HttpStatusCode.OK, ordemServicoCreate);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/update")]
        public Task<HttpResponseMessage> Put(OrdemServico ordemServico)
        {
            var ordemServicoUpdate = _service.Update(ordemServico);
            ordemServicoUpdate.Cliente = _cliente.Get(ordemServicoUpdate.ClienteId);
            return CreateResponse(HttpStatusCode.OK, ordemServicoUpdate);
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

        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/finalizar")]
        public Task<HttpResponseMessage> Finalizar(OrdemServico ordemServico)
        {
            var OrdemServicoFinish = _service.Finish(ordemServico.Id);
            return CreateResponse(HttpStatusCode.OK, OrdemServicoFinish);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/ativarOrdemServico")]
        public Task<HttpResponseMessage> AtivarOrdemServico(OrdemServico ordemServico)
        {
            var OrdemServicoAtivada = _service.AtivarOrdemServico(ordemServico);
            return CreateResponse(HttpStatusCode.OK, OrdemServicoAtivada);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/retornarPendente")]
        public Task<HttpResponseMessage> RetornarPendente(OrdemServico ordemServico)
        {
            var OrdemServicoRetorno = _service.RetornarPendente(ordemServico.Id);
            return CreateResponse(HttpStatusCode.OK, OrdemServicoRetorno);
        }   

        [HttpPost]
        //[Authorize]
        [Route("api/ordemServico/cancelar")]
        public Task<HttpResponseMessage> Cancelar(OrdemServico ordemServico)
        {
            var OrdemServicoCanceled = _service.Cancel(ordemServico);
            return CreateResponse(HttpStatusCode.OK, OrdemServicoCanceled);
        }

        [HttpPost]
        [Route("api/ordemServico/buscarPorData/")]
        public Task<HttpResponseMessage> BuscarPorData([FromBody] dynamic parametros)
        {

            var dataInicial = (DateTime)parametros.dataInicial;
            var dataEncerramento = parametros.dataEncerramento;
            dataEncerramento = dataEncerramento != null ? dataEncerramento : null;

            if (dataEncerramento != null)
            {
                dataEncerramento = (DateTime)dataEncerramento;
                dataEncerramento = dataEncerramento.Date.AddDays(1).AddTicks(-1);
            }

            var ordemServicos = _service.BuscarPorData(dataInicial.Date, dataEncerramento);

            return CreateResponse(HttpStatusCode.OK, ordemServicos);
        }

    }
}