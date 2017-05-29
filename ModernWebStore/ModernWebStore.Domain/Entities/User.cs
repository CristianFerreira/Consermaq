using ModernWebStore.Domain.Scopes;
using ModernWebStore.SharedKernel.Helpers;
using System;

namespace ModernWebStore.Domain.Entities
{
    public class User
    {
        public User() { }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public string Nome { get; set; }
        public bool Bloqueado { get; set; }
        

        public string criptografaPassword(string password)
        {
            password = StringHelper.Encrypt(password);

            return password;
        }

        public void Authenticate(string email, string login, string password)
        {
            if (!this.AuthenticateUserScopeIsValid(email, login, password))
                return;
        }

        public void Register()
        {
            if (!this.RegisterUserScopeIsValid())
                return;
        }

        public void GrantAdmin()
        {
            this.IsAdmin = true;
        }

        public void RevokeAdmin()
        {
            this.IsAdmin = false;
        }
    }
}
