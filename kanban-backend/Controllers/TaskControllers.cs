using Microsoft.AspNetCore.Mvc;
using KanbanApp.Data;
using KanbanApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace KanbanApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskControllers : ControllerBase
    {
        private readonly KanbanAppDbContext _kanbanAppDbContext;

        public TaskControllers(KanbanAppDbContext context)
        {
            _kanbanAppDbContext = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var task = await _kanbanAppDbContext.TaskItems.ToListAsync();
            return Ok(task);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksId(int id)
        {
            var task = await _kanbanAppDbContext.TaskItems.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTask(TaskItem taskItem)
        {
            if (taskItem == null)
            {
                return BadRequest("Don't have Item");
            }
            var user = await _kanbanAppDbContext.UserItems.FindAsync(taskItem.UserId);
            if (user == null)
            {
                return BadRequest("Don't  have user");
            }
            var project = await _kanbanAppDbContext.ProjectItems.FindAsync(taskItem.ProjectId);
            if (project == null)
            {
                return BadRequest("Don't  have project");
            }
            if (!IsTaskOwnedByCurrentUser(taskItem))
            {
                return Forbid("You cannot modify tasks that don't belong to you.");
            }

            if (taskItem.Deadline.HasValue) // Проверяем, установлен ли дедлайн
            {
                if (taskItem.Deadline < DateTime.Now) // Проверяем, не в прошлом ли дедлайн
                {
                    return BadRequest("Deadline cannot be in the past."); // Возвращаем ошибку, если дедлайн в прошлом
                }
            }

            await _kanbanAppDbContext.TaskItems.AddAsync(taskItem);


            await _kanbanAppDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { taskItem.Id }, taskItem);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var taskItem = await _kanbanAppDbContext.TaskItems.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }
            if (!IsTaskOwnedByCurrentUser(taskItem))
            {
                return Forbid("this is not your task.");
            }
            _kanbanAppDbContext.TaskItems.Remove(taskItem);
            await _kanbanAppDbContext.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]

        public async Task<ActionResult> PutTask(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest("Id doesn't match");
            }
            if (!IsTaskOwnedByCurrentUser(taskItem))
            {
                return Forbid("You cannot modify tasks that don't belong to you.");
            }
            if (taskItem.Deadline.HasValue) // Проверяем, установлен ли дедлайн
            {
                if (taskItem.Deadline < DateTime.Now) // Проверяем, не в прошлом ли дедлайн
                {
                    return BadRequest("Deadline cannot be in the past."); // Возвращаем ошибку, если дедлайн в прошлом
                }
            }
            _kanbanAppDbContext.Entry(taskItem).State = EntityState.Modified;
            try
            {
                await _kanbanAppDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!TaskExists(id))
                {
                    return NotFound();
                }
                throw;
            }
            return NoContent();

        }
        [Authorize]
        [HttpPut("update-status/{id}")]
        public async Task<ActionResult> UpdateTaskStatus(int id, [FromBody] Task_Status status)
        {
            var task = await _kanbanAppDbContext.TaskItems.FindAsync(id);
            if (task == null)
            {
                return NotFound("Task not found");
            }
            task.Status = status;
            await _kanbanAppDbContext.SaveChangesAsync();
            return Ok(task);
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult> FiltrationTaskStatus(Task_Status status)
        {
            var task = await _kanbanAppDbContext.TaskItems
            .Where(x => x.Status == status)
            .ToListAsync();
            return Ok(task);
        }
        [HttpGet("my-tasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetMyTasks()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId))
                return Forbid("User not authenticated.");
            var tasks = await _kanbanAppDbContext.TaskItems
            .Where(x => x.UserId.ToString() == currentUserId)
            .ToListAsync();
            return Ok(tasks);
        }
        [HttpGet("projects/{projectId}/tasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetProjectTasks(int projectId)
        {
            var tasks = await _kanbanAppDbContext.TaskItems
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();

            if (tasks.Count == 0)
            {
                return NotFound("No tasks found for this project.");
            }

            return Ok(tasks);
        }


        private bool IsTaskOwnedByCurrentUser(TaskItem taskItem)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // Если пользователь не авторизован, возвращаем false
            if (string.IsNullOrEmpty(currentUserId))
            {
                return false;
            }

            // Сравниваем идентификатор пользователя задачи с текущим пользователем
            return taskItem.UserId.ToString() == currentUserId;
        }
        private bool TaskExists(int id)
        {
            return _kanbanAppDbContext.TaskItems.Any(x => x.Id == id);
        }
    }
}