using KanbanApp.Application.Interfaces;
using KanbanApp.Core.Models;
using KanbanApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly KanbanAppDbContext _kanbanAppDbContext;
        public ProjectRepository(KanbanAppDbContext kanbanAppDbContext)
        {
            _kanbanAppDbContext = kanbanAppDbContext;
        }
        public async Task<IEnumerable<ProjectItem>> GetAllAsync()
        {
            return await _kanbanAppDbContext.ProjectItems.ToListAsync();
        } 

        public async Task<ProjectItem?> GetByIdAsync(int id)
        {
            return await _kanbanAppDbContext.ProjectItems
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(ProjectItem item)
        {
            await _kanbanAppDbContext.ProjectItems.AddAsync(item);
            await _kanbanAppDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(ProjectItem item)
        {
           _kanbanAppDbContext.ProjectItems.Remove(item);
            await _kanbanAppDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProjectItem item)
        {
           _kanbanAppDbContext.Entry(item).State = EntityState.Modified;
            await _kanbanAppDbContext.SaveChangesAsync();
        }
    }
}