using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Models;

namespace KanbanApp.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectItem>> GetAllProjectsAsync()
        {
            return await _projectRepository.GetAllAsync();
        }

        public async Task<ProjectItem?> GetProjectByIdAsync(int id)
        {
            return await _projectRepository.GetByIdAsync(id);
        }

        public async Task<ProjectItem> CreateProjectAsync(ProjectItem projectItem)
        {
            if (string.IsNullOrWhiteSpace(projectItem.Name))
            {
                throw new ArgumentException("Название проекта обязательно.");
            }

            if (projectItem.Tasks != null && projectItem.Tasks.Any())
            {
                foreach (var task in projectItem.Tasks)
                {
                    task.ProjectId = projectItem.Id;
                }
            }

            await _projectRepository.AddAsync(projectItem);
            return projectItem;
        }

        public async Task UpdateProjectAsync(ProjectItem projectItem)
        {
            var existingProject = await _projectRepository.GetByIdAsync(projectItem.Id);
            if (existingProject == null)
            {
                throw new KeyNotFoundException("Проект не найден.");
            }

            await _projectRepository.UpdateAsync(projectItem);
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null)
            {
                throw new KeyNotFoundException("Проект не найден.");
            }

            await _projectRepository.DeleteAsync(project);
        }

       
    }
}
