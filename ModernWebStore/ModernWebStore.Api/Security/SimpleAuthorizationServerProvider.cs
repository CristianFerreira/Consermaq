using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using ModernWebStore.Api.Sistema;
using ModernWebStore.Domain.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;

namespace ModernWebStore.Api.Security
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        IUserApplicationService _userService;

        public SimpleAuthorizationServerProvider(IUserApplicationService userService)
        {
            this._userService = userService;
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            
            var user = _userService.Authenticate(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("invalid_grant", "Usuário ou senha inválidos");
                return;
            }
            else if (user.Bloqueado)
            {
                context.SetError("invalid_grant", "Usuário bloqueado");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            // adiciona o sistema logado para identificacao na tela
            var props = new AuthenticationProperties();

            var sistemaContexto = new SistemaContexto
            {
                UsuarioLogado = user
            };

            var sistemaContextoJson = JsonConvert.SerializeObject(sistemaContexto, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });

            identity.AddClaim(new Claim("sistema_contexto", sistemaContextoJson));

            props.Dictionary.Add("sistema_contexto", sistemaContextoJson);


            //var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            //identity.AddClaim(new Claim(ClaimTypes.Name, user.Email));
            //identity.AddClaim(new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : ""));

            //GenericPrincipal principal = new GenericPrincipal(identity, new string[] { user.IsAdmin ? "admin" : "" });
            //Thread.CurrentPrincipal = principal;

            //context.Validated(identity);

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
                context.AdditionalResponseParameters.Add(property.Key, property.Value);

            return Task.FromResult<object>(null);
        }
    
    }
}