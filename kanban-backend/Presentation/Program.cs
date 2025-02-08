using Microsoft.EntityFrameworkCore;
using KanbanApp.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using KanbanApp.Core.Models;
using KanbanApp.Application.Interfaces;
using KanbanApp.Infrastructure.Repositories;
using KanbanApp.Application.Services;
using KanbanApp.Core.Enums;
using DevelopForum.Infastructure.Data;

var builder = WebApplication.CreateBuilder(args);

var isDocker = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

var connectionString = isDocker
    ? builder.Configuration.GetConnectionString("DockerConnection")
    : builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<KanbanAppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Настройка Swagger для документации API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // Добавлено для поддержки контроллеров

// Настройка CORS политики
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Чтение переменных окружения для настройки строки подключения к базе данных




// Настройка Identity для работы с пользователями и ролями
builder.Services.AddIdentity<UserItem, IdentityRole<int>>() // Добавляем Identity
    .AddEntityFrameworkStores<KanbanAppDbContext>() // Указываем, что храним пользователей и роли в нашей БД через KanbanAppDbContext
    .AddDefaultTokenProviders(); // Поддержка токенов для сброса пароля и других функций

// Регистрация сервисов и репозиториев
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();


var app = builder.Build();
DataBaseInitializer.ApplyMigrations(app.Services); 
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RoleIntializer.InitializeRoles(services);
}

// Настройка HTTP-пайплайна
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting(); // Включение маршрутизации

// Подключаем политику CORS
app.UseCors("AllowAllOrigins");

app.UseAuthentication(); // Подключаем аутентификацию
app.UseAuthorization(); // Подключаем авторизацию

app.MapControllers(); // Подключение маршрутов контроллеров

app.Run();
