using KanbanApp.Core.Models;
using KanbanApp.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace KanbanApp.Infrastructure.Data
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(Task_Status status);
        Task<IEnumerable<TaskItem>> GetTasksByProjectIdAsync(int projectId);
        Task AddTaskAsync(TaskItem taskItem);
        Task UpdateTaskAsync(TaskItem taskItem);
        Task SaveChangesAsync();
        Task<IEnumerable<TaskItem>> GetMyTasksAsync(string userId);

        Task DeleteTaskAsync(TaskItem taskItem);
        bool TaskExistsAsync(int id);
       
    }
}