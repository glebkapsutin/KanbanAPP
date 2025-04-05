using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Models;
using KanbanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly KanbanAppDbContext _dbContext;

        public UserRepository(KanbanAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<UserItem>> GetAllUsersAsync()
        {
            return await _dbContext.UserItems.ToListAsync();
        }

        public async Task<UserItem?> GetUserByIdAsync(int id)
        {
            return await _dbContext.UserItems.FindAsync(id);
        }

        public async Task AddUserAsync(UserItem user)
        {
            await _dbContext.UserItems.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(UserItem user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(UserItem user)
        {
            _dbContext.UserItems.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public bool UserExists(int id)
        {
            return _dbContext.UserItems.Any(x => x.Id == id);
        }
    }
}
