using Microsoft.AspNetCore.Mvc;
using KanbanApp.Data;
using KanbanApp.Models;
using Microsoft.EntityFrameworkCore;


namespace KanbanApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectControllers : ControllerBase
    {
        private readonly KanbanAppDbContext _kanbanAppDbContext;

        public ProjectControllers(KanbanAppDbContext context)
        {
            _kanbanAppDbContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectItem>>> GetProjects()
        {
            try
            {
                var projects = await _kanbanAppDbContext.ProjectItems
                    .ToListAsync();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                // Логирование ошибки
                Console.WriteLine($"Ошибка: {ex.Message} | StackTrace: {ex.StackTrace}");
                return StatusCode(500, "Произошла ошибка на сервере.");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProjectItem>>> GetProjectId(int id)
        {
            var project = await _kanbanAppDbContext.ProjectItems
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }
        [HttpPost]
        public async Task<ActionResult<ProjectItem>> PostProject(ProjectItem ProjectItem)
        {
            if (ProjectItem == null)
            {
                return BadRequest("Dont have Item");

            }
            if (string.IsNullOrWhiteSpace(ProjectItem.Name))
            {
                return BadRequest("Project name is required.");
            }
            
            if (ProjectItem.Tasks!= null  && ProjectItem.Tasks.Any())
            {
                foreach(var task in ProjectItem.Tasks)
                {
                    task.ProjectId = ProjectItem.Id;
                    await _kanbanAppDbContext.TaskItems.AddAsync(task);
                }
            }
            
            await _kanbanAppDbContext.ProjectItems.AddAsync(ProjectItem);
            await _kanbanAppDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProjects), new { ProjectItem.Id }, ProjectItem);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var projectItem = await _kanbanAppDbContext.ProjectItems.FindAsync(id);
            if (projectItem == null)
            {
                return NotFound();
            }
            _kanbanAppDbContext.ProjectItems.Remove(projectItem);
            await _kanbanAppDbContext.SaveChangesAsync();
            return NoContent();
        }


        [HttpPut("{id}")]

        public async Task<ActionResult> PutProject(int id, ProjectItem projectItem)
        {
            if (id != projectItem.Id)
            {
                return BadRequest("Id doesn't match");
            }
            _kanbanAppDbContext.Entry(projectItem).State = EntityState.Modified;
            try
            {
                await _kanbanAppDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                throw;
            }
            return NoContent();

        }

        private bool ProjectExists(int id)
        {
            return _kanbanAppDbContext.ProjectItems.Any(x => x.Id == id);
        }
    }
}