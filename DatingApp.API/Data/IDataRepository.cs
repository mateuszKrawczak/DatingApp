using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDataRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<User> GetUser(int id);
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);

         Task<Like> GetLike(int userId, int recipientId);
    }
}