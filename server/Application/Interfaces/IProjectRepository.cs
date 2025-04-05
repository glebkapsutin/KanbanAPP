

using KanbanApp.Core.Models;


namespace KanbanApp.Application.Interfaces
{
    public interface IProjectRepository
    {
        Task <IEnumerable<ProjectItem>> GetAllAsync();
        Task <ProjectItem?> GetByIdAsync(int id);
        
        Task AddAsync(ProjectItem item);

        Task DeleteAsync(ProjectItem item);

        Task UpdateAsync(ProjectItem item);



    }
}
