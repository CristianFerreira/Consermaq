using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class PessoaFisicaController : BaseController
    {
        private readonly IPessoaFisicaApplicationService _service;

        public PessoaFisicaController(IPessoaFisicaApplicationService service)
        {
            this._service = service;
        }


        [HttpGet]
        //[Authorize]
        [Route("api/pessoafisica/listAll")]
        public Task<HttpResponseMessage> Get()
        {
            var pessoasFisica = _service.Get();
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/pessoafisica/{skip:int:min(0)}/{take:int:min(1)}")]
        public Task<HttpResponseMessage> GetByRange(int skip, int take)
        {
            var pessoasFisica = _service.Get(skip, take);
            return CreateResponse(HttpStatusCode.OK, pessoasFisica);
        }


        [HttpPost]
        //[Authorize]
        [Route("api/pessoafisica/create")]
        public Task<HttpResponseMessage> Post(PessoaFisica pf)
        {
            var PessoaFisica = _service.Create(pf);
            return CreateResponse(HttpStatusCode.Created, PessoaFisica);
        }

        [HttpPut]
        //[Authorize]
        [Route("api/pessoafisica/update")]
        public Task<HttpResponseMessage> Put(PessoaFisica pf)
        {
            var PessoaFisica = _service.Update(pf);
            return CreateResponse(HttpStatusCode.OK, PessoaFisica);
        }

        [HttpDelete]
        //[Authorize]
        [Route("api/pessoaFisica/delete/{id}")]
        public Task<HttpResponseMessage> Delete(int id)
        {
            var PessoaFisca = _service.Delete(id);
            return CreateResponse(HttpStatusCode.OK, PessoaFisca);
        }


    }
}

