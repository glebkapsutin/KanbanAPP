

using KanbanApp.Core.Models;


namespace KanbanApp.Application.Interfaces
{
    public interface IProjectService
    {
        Task <IEnumerable<ProjectItem>> GetAllProjectsAsync();
        Task <ProjectItem?> GetProjectByIdAsync(int id);
        
        Task <ProjectItem>CreateProjectAsync(ProjectItem item);

        Task  DeleteProjectAsync(int id);

        Task  UpdateProjectAsync(ProjectItem item);



    }
}
