using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Enums;
using KanbanApp.Core.Models;
using KanbanApp.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly KanbanAppDbContext _dbContext;

        public TaskRepository(KanbanAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _dbContext.TaskItems.ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _dbContext.TaskItems.FindAsync(id);
        }


        public async Task AddTaskAsync(TaskItem item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Task item cannot be null.");
            }
            await _dbContext.TaskItems.AddAsync(item);
            await _dbContext.SaveChangesAsync();
            
        }

        public async Task DeleteTaskAsync(TaskItem item)
        {
            _dbContext.TaskItems.Remove(item);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateTaskAsync(TaskItem item)
        {
            _dbContext.Entry(item).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(Task_Status status)
        {
            return await _dbContext.TaskItems.Where(x => x.Status == status).ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetByUserIdAsync(string userId)
        {
            return await _dbContext.TaskItems.Where(x => x.UserId.ToString() == userId).ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByProjectIdAsync(int projectId)
        {
            return await _dbContext.TaskItems.Where(x => x.ProjectId == projectId).ToListAsync();
        }

        public  bool TaskExistsAsync(int id)
        {
            return _dbContext.TaskItems.Any(x => x.Id == id);
        }

        public async Task SaveChangesAsync()
        {
           await _dbContext.SaveChangesAsync();
        }
        public async Task<IEnumerable<TaskItem>> GetMyTasksAsync(string userId)
        {
            return await _dbContext.TaskItems
                .Where(x => x.UserId.ToString() == userId)
                .ToListAsync();
        }

       
    }
}
