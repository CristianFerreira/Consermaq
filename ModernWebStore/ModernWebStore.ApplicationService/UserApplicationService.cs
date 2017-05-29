using ModernWebStore.Domain.Commands.UserCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System.Collections.Generic;

namespace ModernWebStore.ApplicationService
{
    public class UserApplicationService : ApplicationService, IUserApplicationService
    {
        private IUserRepository _repository;

        public UserApplicationService(IUserRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
        }

        public User Register(User usuario)
        {
             usuario.Password = usuario.criptografaPassword(usuario.Password);
             usuario.Register();
            _repository.Register(usuario);

            if (Commit())
                return usuario;

            return null;
        }

        public User Update(User usuario)
        {
            if(usuario.Password.Length <= 12)
                usuario.Password = usuario.criptografaPassword(usuario.Password);

            _repository.Update(usuario);

            if (Commit())
                return usuario;

            return null;
        }

        public User Authenticate(string username, string password)
        {
            return _repository.Authenticate(username, password);
        }

        public List<User> List()
        {
            return _repository.List();
        }

        public User Get(int id)
        {
            return _repository.Get(id);
        }
    }
}
