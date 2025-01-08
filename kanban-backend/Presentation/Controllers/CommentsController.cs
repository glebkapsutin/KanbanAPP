
using Microsoft.AspNetCore.Mvc;
using KanbanApp.Data;
using KanbanApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class CommentsController : ControllerBase
{   
    private readonly KanbanAppDbContext _dbContext;
    public CommentsController(KanbanAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> CommentsPost(Comment comment)
    {   
        var task = await _dbContext.TaskItems.FindAsync(comment.TaskId);
        if (task == null)
        {
            return NotFound("task not found");
        }
        var user = await _dbContext.Users.FindAsync(comment.UserId);
        if(user == null)
        {
            return BadRequest("User not found");
        }
        await _dbContext.Comments.AddAsync(comment);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(CommentsGet), new { comment.Id }, comment);

    }
    [HttpGet("tasks/{taskId}/comments")]
    public async Task<ActionResult<IEnumerable<Comment>>>  CommentsGet(int taskId)
    {
        var task = await _dbContext.TaskItems.FindAsync(taskId);
        if (task == null)
        {
            return NotFound("task not found");
        }
        var comments = await _dbContext.Comments
                     .Where(c=> c.TaskId == taskId)
                     .ToListAsync();
        if(comments.Count == 0)
        {
            return BadRequest("No comments found for this task");
        }
        return Ok(comments);
    }
    [HttpDelete("{commentId}")]
    public async Task<ActionResult> CommentsDelete(int commentId)
    {
        var comment = await _dbContext.Comments.FindAsync(commentId);
        if (comment == null)
    {
        return NotFound("Comment not found");
    }

    // 3. Проверка прав текущего пользователя (если требуется)
    if (!IsCommentOwnedByCurrentUser(comment))
    {
        return Forbid("You do not have permission to delete this comment.");
    }

    // 4. Удаление комментария
    _dbContext.Comments.Remove(comment);

    // 5. Сохранение изменений
    await _dbContext.SaveChangesAsync();

    // 6. Возвращаем NoContent в случае успешного удаления
    return NoContent();
    }
    private bool IsCommentOwnedByCurrentUser(Comment comment)
    {
        // Получаем текущий ID пользователя из контекста авторизации
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Если пользователь не авторизован, возвращаем false
        if (string.IsNullOrEmpty(currentUserId))
        {
            return false;
        }

        // Сравниваем идентификатор пользователя, создавшего комментарий, с текущим пользователем
        return comment.UserId.ToString() == currentUserId;
    }

}

