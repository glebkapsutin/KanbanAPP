using System.IdentityModel;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using KanbanApp.Core.Enums;
namespace KanbanApp.Core.Models
{


    public class TaskItem
    {
        public int? Id { get; set; }
        public Task_Status? Status { get; set; } = Task_Status.To_Do; // По умолчанию

        public string? Description { get; set; }

        public string? TaskName { get; set; }

        public DateTime? CreatedTask { get; set; }

        public int ProjectId { get; set; } // Связь с проектом
        [JsonIgnore]
        public ProjectItem? Project { get; set; } // Навигационное свойство
        public int? UserId { get; set; } // Связь с пользователем
        public UserItem? User { get; set; } // Навигационное свойство

        public DateTime? Deadline { get; set; }

        

    }
}