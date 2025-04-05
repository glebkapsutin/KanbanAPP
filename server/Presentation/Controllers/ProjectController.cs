using Microsoft.AspNetCore.Mvc;
using KanbanApp.Core.Models;
using KanbanApp.Application.Interfaces;

namespace KanbanApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectItem>>> GetProjects()
        {
            try
            {
                var projects = await _projectService.GetAllProjectsAsync();
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
        public async Task<ActionResult<ProjectItem>> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectItem>> PostProject(ProjectItem projectItem)
        {
            try
            {
                if (projectItem == null)
                {
                    return BadRequest("Проект не передан.");
                }

                var createdProject = await _projectService.CreateProjectAsync(projectItem);
                return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutProject(int id, ProjectItem projectItem)
        {
            if (id != projectItem.Id)
            {
                return BadRequest("Id не совпадает.");
            }

            try
            {
                await _projectService.UpdateProjectAsync(projectItem);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            try
            {
                await _projectService.DeleteProjectAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
