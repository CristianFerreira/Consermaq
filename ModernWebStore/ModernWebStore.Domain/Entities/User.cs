using ModernWebStore.Domain.Scopes;
using ModernWebStore.SharedKernel.Helpers;
using System;

namespace ModernWebStore.Domain.Entities
{
    public class User
    {
        protected User() { }

        public User(string email, string password, bool isAdmin, string login, string nome)
        {
            this.Email = email;
            this.Password = StringHelper.Encrypt(password);
            this.IsAdmin = isAdmin;
            this.Login = login;
            this.Nome = nome;
        }

        public int Id { get; private set; }
        public string Email { get; private set; }
        public string Login { get; private set; }
        public string Password { get; private set; }
        public bool IsAdmin { get; private set; }
        public string Nome { get; private set; }
        

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
