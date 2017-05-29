namespace ModernWebStore.Domain.Commands.UserCommands
{
    public class RegisterUserCommand
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string nome { get; set; }
        public string login { get; set; }
        public bool IsAdmin { get; set; }
        public bool Bloqueado { get; set; }

        public RegisterUserCommand(string email, string password, bool isAdmin, string login, string nome, bool bloqueado)
        {
            this.Email = email;
            this.Password = password;
            this.IsAdmin = isAdmin;
            this.login = login;
            this.nome = nome;
            this.Bloqueado = bloqueado;
        }
    }
}
