
using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Enums;
using KanbanApp.Core.Models;
using KanbanApp.Infrastructure.Data;


namespace KanbanApp.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<TaskItem>> GetTaskAsync()
        {
            return await _taskRepository.GetAllTasksAsync();
        }

        public async Task<TaskItem?> GetTaskIdAsync(int id)
        {
            return await _taskRepository.GetTaskByIdAsync(id);
        }

        public async Task<TaskItem> AddTaskAsync(TaskItem taskItem)
        {
            if (taskItem.ProjectId == null)
            {
                throw new ArgumentException("ProjectId is required.");
            }

            if (taskItem.Deadline.HasValue && taskItem.Deadline < DateTime.Now)
            {
                throw new ArgumentException("Deadline cannot be in the past.");
            }

            taskItem.Status ??= Task_Status.To_Do;

            await _taskRepository.AddTaskAsync(taskItem);
            
            return taskItem;
        }

        public async Task TaskDeleteAsync(int id)
        {
            var taskItem = await _taskRepository.GetTaskByIdAsync(id);
            if (taskItem == null)
            {
                throw new KeyNotFoundException("Task not found.");
            }

            

            await _taskRepository.DeleteTaskAsync(taskItem);
            
        }

       public async Task TaskUpdateAsync(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                throw new ArgumentException("Task ID mismatch.");
            }

           

            if (taskItem.Deadline.HasValue && taskItem.Deadline < DateTime.Now)
            {
                throw new ArgumentException("Deadline cannot be in the past.");
            }

            await _taskRepository.UpdateTaskAsync(taskItem);
        }


        public async Task<IEnumerable<TaskItem>> GetProjectTasks(int projectId)
        {
            return await _taskRepository.GetTasksByProjectIdAsync(projectId);
        }

        public async Task<IEnumerable<TaskItem>> GetMyTasks(string userId)
        {
            return await _taskRepository.GetMyTasksAsync(userId);
        }

        public async Task<IEnumerable<TaskItem>> FiltrationTaskStatus(Task_Status status)
        {
            return await _taskRepository.GetTasksByStatusAsync(status);
        }

       public async Task UpdateTaskStatus(int id, Task_Status status)
        {
            var taskItem = await _taskRepository.GetTaskByIdAsync(id);
            if (taskItem == null)
            {
                throw new KeyNotFoundException("Task not found.");
            }

            // Обновляем статус задачи
            taskItem.Status = status;

            // Сохраняем изменения через репозиторий
            await _taskRepository.UpdateTaskAsync(taskItem);
        }



        public bool TaskExistsAsync(int id)
        {
            return _taskRepository.TaskExistsAsync(id);
        }

       public bool IsTaskOwnedByCurrentUser(TaskItem taskItem, string currentUserId)
        {
            return taskItem.UserId.ToString() == currentUserId;
        }

    }
}
