using ModernWebStore.Api.Security;
using ModernWebStore.Domain.Commands.UserCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserApplicationService _service;

        public UserController(IUserApplicationService service)
        {
            this._service = service;
        }

        [HttpGet]
        [Route("api/user/listAll")]
        //[Authorize(Roles = "admin")]
        public Task<HttpResponseMessage> Get()
        {
            var users = _service.List();
            return CreateResponse(HttpStatusCode.OK, users);
        }

        [HttpPost]
        [Route("api/user/create")]
        public Task<HttpResponseMessage> Create(User usuario)
        {
            var user = _service.Register(usuario);

            return CreateResponse(HttpStatusCode.Created, user);
        }

        [HttpPost]
        [Route("api/user/update")]
        public Task<HttpResponseMessage> Update(User usuario)
        {
            var user = _service.Update(usuario);

            return CreateResponse(HttpStatusCode.OK, user);
        }
    }
}