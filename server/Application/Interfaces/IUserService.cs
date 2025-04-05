using KanbanApp.Core.Models;

namespace KanbanApp.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserItem>> GetUsersAsync();
        Task<UserItem?> GetUserByIdAsync(int id);
        Task<UserItem> CreateUserAsync(UserItem user);
        Task UpdateUserAsync(int id, UserItem user);
        Task DeleteUserAsync(int id);
        bool UserExists(int id);
    }
}
