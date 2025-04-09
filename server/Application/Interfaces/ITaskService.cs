using KanbanApp.Core.Enums;
using KanbanApp.Core.Models;

namespace KanbanApp.Application.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetTaskAsync();
        Task<TaskItem?> GetTaskIdAsync(int id);
        Task<TaskItem> AddTaskAsync(TaskItem taskItem);
        Task TaskDeleteAsync(int id);
        Task TaskUpdateAsync(int id, TaskItem taskItem);
        Task<IEnumerable<TaskItem>> GetProjectTasks(int projectId);
        Task<IEnumerable<TaskItem>> GetMyTasks(string userId);
        Task<IEnumerable<TaskItem>> FiltrationTaskStatus(Task_Status status);
        Task UpdateTaskStatus(int id, Task_Status status);
        bool TaskExistsAsync(int id);
        bool IsTaskOwnedByCurrentUser(TaskItem taskItem,string currentUserId);
    }
}
