using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Specs;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace ModernWebStore.Infra.Repositories
{
    public class UserRepository : IUserRepository
    {
        private StoreDataContext _context;

        public UserRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Register(User user)
        {
            _context.Users.Add(user);
        }

        public void Update(User user)
        {
            _context.Entry<User>(user).State = EntityState.Modified;
        }

        public User Authenticate(string username, string password)
        {
            return _context.Users
                .Where(UserSpecs.AuthenticateUser(username, password))
                .FirstOrDefault();
        }

        public User GetByEmail(string email)
        {
            return _context.Users
                .Where(UserSpecs.GetByEmail(email))
                .FirstOrDefault();
        }

        public User Get(int id)
        {
            return _context.Users.Find(id);
        }

        public List<User> List()
        {
            return _context.Users.OrderBy(x => x.Email).ToList();
        }
    }
}
