using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class PessoaJuridicaController : BaseController
    {
        private readonly IPessoaJuridicaApplicationService _service;

        public PessoaJuridicaController(IPessoaJuridicaApplicationService service)
        {
            this._service = service;
        }


        [HttpGet]
        //[Authorize]
        [Route("api/pessoajuridica/listAll")]
        public Task<HttpResponseMessage> Get()
        {
            var pessoasFisica = _service.Get();
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/pessoajuridica/{skip:int:min(0)}/{take:int:min(1)}")]
        public Task<HttpResponseMessage> GetByRange(int skip, int take)
        {
            var pessoasFisica = _service.Get(skip, take);
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/pessoajuridica/create")]
        public Task<HttpResponseMessage> Post(PessoaJuridica pj)
        {
            var PessoaJuridica = _service.Create(pj);
            return CreateResponse(HttpStatusCode.Created, PessoaJuridica);
        }

        [HttpPut]
        //[Authorize]
        [Route("api/pessoajuridica/update")]
        public Task<HttpResponseMessage> Put(PessoaJuridica pj)
        {
            var PessoaJuridica = _service.Update(pj);
            return CreateResponse(HttpStatusCode.OK, PessoaJuridica);
        }

        [HttpDelete]
        //[Authorize]
        [Route("api/pessoajuridica/delete/{id}")]
        public Task<HttpResponseMessage> Delete(int id)
        {
            var PessoaJuridica = _service.Delete(id);
            return CreateResponse(HttpStatusCode.OK, PessoaJuridica);
        }


    }
}

