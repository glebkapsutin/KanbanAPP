using Microsoft.AspNetCore.Mvc;
using KanbanApp.Data;
using KanbanApp.Models;
using Microsoft.EntityFrameworkCore;


namespace KanbanApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersControllers : ControllerBase
    {
        private readonly KanbanAppDbContext _kanbanAppDbContext;

        public UsersControllers(KanbanAppDbContext context)
        {
            _kanbanAppDbContext = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserItem>>> GetUsers()
        {
            var task = await _kanbanAppDbContext.ProjectItems.ToListAsync();
            return Ok(task);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProjectItem>>> GetUserId(int id)
        {
            var task = await _kanbanAppDbContext.ProjectItems.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }
        [HttpPost]
        public async Task<ActionResult<ProjectItem>> PostUser(UserItem UserItem)
        {
            if (UserItem == null)
            {
                return BadRequest("Dont have Item");
            }
            await _kanbanAppDbContext.UserItems.AddAsync(UserItem);

            await _kanbanAppDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { UserItem.Id }, UserItem);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var userItem = await _kanbanAppDbContext.UserItems.FindAsync(id);
            if (userItem == null)
            {
                return NotFound();
            }
            _kanbanAppDbContext.UserItems.Remove(userItem);
            await _kanbanAppDbContext.SaveChangesAsync();
            return NoContent();
        }


        [HttpPut("{id}")]

        public async Task<ActionResult> PutUser(int id, UserItem userItem)
        {
            if (id != userItem.Id)
            {
                return BadRequest("Id doesn't match");
            }
            _kanbanAppDbContext.Entry(userItem).State = EntityState.Modified;
            try
            {
                await _kanbanAppDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!UserExists(id))
                {
                    return NotFound();
                }
                throw;
            }
            return NoContent();

        }

        private bool UserExists(int id)
        {
            return _kanbanAppDbContext.UserItems.Any(x => x.Id == id);
        }
    }
}