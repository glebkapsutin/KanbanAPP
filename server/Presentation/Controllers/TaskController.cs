using Microsoft.AspNetCore.Mvc;
using KanbanApp.Infrastructure.Data;
using KanbanApp.Core.Models;
using KanbanApp.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using KanbanApp.Application.Interfaces;



namespace KanbanApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
 
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var task = await _taskService.GetTaskAsync();
            return Ok(task);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTasksId(int id)
        {
            var task = await _taskService.GetTaskIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTask([FromBody] TaskItem taskItem)
        {
            if (taskItem == null)
            {
                return BadRequest("Task item cannot be null.");
            }

            try
            {
                // Используем метод из сервиса для добавления задачи
                var createdTask = await _taskService.AddTaskAsync(taskItem);

                // Возвращаем созданную задачу с кодом 201 (Created) и ссылкой на нее
                return CreatedAtAction(nameof(GetTasksId), new { id = createdTask.Id }, createdTask);
            }
            catch (ArgumentException ex)
            {
                // Если данные невалидны (например, ProjectId отсутствует или Deadline в прошлом)
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                // Если связанный проект не найден
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                // Для любых других ошибок возвращаем код 500
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

       
        [HttpDelete("{id}")]
       
        public async Task<ActionResult> DeleteTask(int id)
        {
            try
            {
                

                // Вызываем метод сервиса для удаления задачи
                await _taskService.TaskDeleteAsync(id);

                // Возвращаем статус 204 (No Content) при успешном удалении
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                // Задача не найдена
                return NotFound(ex.Message);
            }
           
            catch (Exception ex)
            {
                // Обработка других ошибок
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }


      
        [HttpPut("{id}")]

        public async Task<ActionResult> PutTask(int id, [FromBody] TaskItem taskItem)
        {
            try
            {
                // Получаем ID текущего пользователя (например, из токена)
               

                // Вызываем метод сервиса для обновления задачи
                await _taskService.TaskUpdateAsync(id, taskItem);

                return NoContent(); // Успешное обновление, без содержимого
            }
            catch (ArgumentException ex)
            {
                // Возвращаем 400, если возникли ошибки в данных задачи
                return BadRequest(ex.Message);
            }
           
            catch (KeyNotFoundException)
            {
                // Возвращаем 404, если задача не найдена
                return NotFound($"Task with ID {id} not found.");
            }
            catch (Exception ex)
            {
                // Возвращаем 500 для любых других ошибок
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        [AllowAnonymous]
        [HttpPut("update-status/{id}")]
        public async Task<ActionResult> UpdateTaskStatus(int id, [FromBody] int status)
        {
            try
            {
                // Вызываем сервис для обновления статуса
                await _taskService.UpdateTaskStatus(id, (Task_Status)status);
                return Ok(new { Message = "Task status updated successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpGet("status/{status}")]
        public async Task<ActionResult> FiltrationTaskStatus(Task_Status status)
        {
            var task = await _taskService.FiltrationTaskStatus(status);
            return Ok(task);
        }
        [HttpGet("my-tasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetMyTasks()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId))
                return Forbid("User not authenticated.");
            var tasks = await _taskService.GetMyTasks(currentUserId);
            return Ok(tasks);
        }
        
        [HttpGet("projects/{projectId}/tasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetProjectTasks(int projectId)
        {
            try
            {
                // Вызываем метод сервиса для получения задач по проекту
                var tasks = await _taskService.GetProjectTasks(projectId);

                // Если задач нет, возвращаем 404 Not Found
                if (!tasks.Any())
                {
                    return NotFound("No tasks found for this project.");
                }

                // Возвращаем список задач
                
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                // Обрабатываем другие возможные ошибки
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
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
            return _taskService.IsTaskOwnedByCurrentUser(taskItem,currentUserId);
        }
        private bool TaskExists(int id)
        {
            return _taskService.TaskExistsAsync(id);
        }
    }
}