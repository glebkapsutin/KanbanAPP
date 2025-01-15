using KanbanApp.Core.Models;

namespace KanbanApp.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserItem>> GetAllUsersAsync();
        Task<UserItem?> GetUserByIdAsync(int id);
        Task AddUserAsync(UserItem user);
        Task UpdateUserAsync(UserItem user);
        Task DeleteUserAsync(UserItem user);
        bool UserExists(int id);
    }
}
