using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class ClienteController : BaseController
    {
        private readonly IClienteApplicationService _service;

        public ClienteController(IClienteApplicationService service)
        {
            this._service = service;
        }

        [HttpGet]
        //[Authorize]
        [Route("api/cliente/listAll")]
        public Task<HttpResponseMessage> Get()
        {
            var pessoasFisica = _service.Get();
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/cliente/listPF")]
        public Task<HttpResponseMessage> GetPF()
        {
            var pessoasFisica = _service.GetPF();
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/cliente/listPJ")]
        public Task<HttpResponseMessage> GetPJ()
        {
            var pessoasJuridica = _service.GetPJ();
            return CreateResponse(HttpStatusCode.OK, pessoasJuridica);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/cliente/{skip:int:min(0)}/{take:int:min(1)}")]
        public Task<HttpResponseMessage> GetByRange(int skip, int take)
        {
            var pessoasFisica = _service.Get(skip, take);
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/cliente/create")]
        public Task<HttpResponseMessage> Post(Cliente cliente)
        {
            var Cliente = _service.Create(cliente);
            return CreateResponse(HttpStatusCode.Created, Cliente);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/cliente/update")]
        public Task<HttpResponseMessage> Put(Cliente cliente)
        {
            var Cliente = _service.Update(cliente);
            return CreateResponse(HttpStatusCode.OK, Cliente);
        }

        [HttpDelete]
        //[Authorize]
        [Route("api/pessoaFisica/delete/{id}")]
        public Task<HttpResponseMessage> Delete(int id)
        {
            var Cliente = _service.Delete(id);
            return CreateResponse(HttpStatusCode.OK, Cliente);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/cliente/deleteAlot")]
        public Task<HttpResponseMessage> DeleteAlot(List<Cliente> clientes)
        {
            var Clientes = _service.DeleteAlot(clientes);
            return CreateResponse(HttpStatusCode.OK, Clientes);
        }

    }
}