using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Models;

namespace KanbanApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UserItem>> GetUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<UserItem?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<UserItem> CreateUserAsync(UserItem user)
        {
            await _userRepository.AddUserAsync(user);
            return user;
        }

        public async Task UpdateUserAsync(int id, UserItem user)
        {
            if (id != user.Id)
            {
                throw new ArgumentException("Id doesn't match");
            }

            if (!_userRepository.UserExists(id))
            {
                throw new KeyNotFoundException("User not found");
            }

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            await _userRepository.DeleteUserAsync(user);
        }

        public bool UserExists(int id)
        {
            return _userRepository.UserExists(id);
        }
    }
}
