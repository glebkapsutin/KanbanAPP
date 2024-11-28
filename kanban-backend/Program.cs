using Microsoft.EntityFrameworkCore; // Необходимо для использования DbContext
using KanbanApp.Data; // Пространство имен для KanbanAppDbContext
using Microsoft.AspNetCore.Identity;
using KanbanApp.Models; // Пространство имен для использования модели UserItem

var builder = WebApplication.CreateBuilder(args);

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
var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "glebkapustin";
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "074123";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "kanbanapp_db";

var connectionString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword}";


// Подключение контекста базы данных с использованием Npgsql и настроенной строки подключения
builder.Services.AddDbContext<KanbanAppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Настройка Identity для работы с пользователями и ролями
builder.Services.AddIdentity<UserItem, IdentityRole<int>>() // Добавляем Identity
    .AddEntityFrameworkStores<KanbanAppDbContext>() // Указываем, что храним пользователей и роли в нашей БД через KanbanAppDbContext
    .AddDefaultTokenProviders(); // Поддержка токенов для сброса пароля и других функций

var app = builder.Build();

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
