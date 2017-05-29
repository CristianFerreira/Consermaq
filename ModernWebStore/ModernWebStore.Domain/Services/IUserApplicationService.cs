using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IUserApplicationService
    {
        User Register(User usuario);
        User Update(User usuario);
        User Authenticate(string email, string password);
        List<User> List();
        User Get(int id);
    }
}
