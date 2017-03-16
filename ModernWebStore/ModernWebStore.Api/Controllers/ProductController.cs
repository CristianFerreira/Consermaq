using ModernWebStore.Domain.Commands.ProductCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ModernWebStore.Api.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductApplicationService _service;

        public ProductController(IProductApplicationService service)
        {
            this._service = service;
        }

        [HttpGet]
        //[Authorize]
        [Route("api/products")]
        public Task<HttpResponseMessage> Get()
        {
            var products = _service.Get();
            return CreateResponse(HttpStatusCode.OK, products);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/products/{skip:int:min(0)}/{take:int:min(1)}")]
        public Task<HttpResponseMessage> GetByRange(int skip, int take)
        {
            var products = _service.Get(skip, take);
            return CreateResponse(HttpStatusCode.OK, products);
        }

        [HttpGet]
        //[Authorize]
        [Route("api/products/outofstock")]
        public Task<HttpResponseMessage> GetInStock()
        {
            var products = _service.GetOutOfStock();
            return CreateResponse(HttpStatusCode.OK, products);
        }

        [HttpPost]
        //[Authorize]
        [Route("api/products")]
        public Task<HttpResponseMessage> Post(Product product)
        {

            var productCreate = _service.Create(product);
            return CreateResponse(HttpStatusCode.Created, productCreate);
        }

        [HttpPut]
        //[Authorize]
        [Route("api/products/{id:int:min(1)}")]
        public Task<HttpResponseMessage> Put(Product product)
        {
            var productUpdate = _service.UpdateBasicInformation(product);
            return CreateResponse(HttpStatusCode.OK, productUpdate);
        }
    }
}