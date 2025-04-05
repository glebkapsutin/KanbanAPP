

---  

```markdown
# 🚀 **Kanban App**  

🔹 **Полноценное веб-приложение** для управления задачами по **методологии Kanban**.  
🔹 **Чистая архитектура (Clean Architecture)** + **JWT-авторизация** + **Drag & Drop**.  
🔹 **ASP.NET Core 7.0 (C#) + React.js + PostgreSQL + Docker**.  

---

## 📌 **Основная идея проекта**  

**Kanban Task Manager** — это удобный инструмент для **управления проектами и задачами**, который позволяет пользователям:  
✅ Создавать **проекты и задачи**  
✅ Распределять задачи по **Kanban-доске**  
✅ **Перетаскивать** задачи между статусами (Drag & Drop)  
✅ **Комментировать** и **оценивать** задачи  
✅ Контролировать **роли пользователей** (администратор, менеджер, пользователь)  
✅ Настраивать права доступа **через JWT**  

Этот проект демонстрирует **чистую архитектуру**, **грамотно организованный код** и **глубокое понимание fullstack-разработки**.

---

## ⚙️ **Стек технологий**  

### **Backend (ASP.NET Core)**
- **Язык**: C#  
- **Фреймворк**: ASP.NET Core 7.0  
- **База данных**: PostgreSQL  
- **ORM**: Entity Framework Core  
- **Аутентификация**: JWT (JSON Web Token)  
- **Архитектура**: Чистая архитектура (Clean Architecture)  
- **Контейнеризация**: Docker  
- **Логирование**: Serilog  

### **Frontend (React.js)**
- **Язык**: JavaScript (планируется TypeScript)  
- **Фреймворк**: React.js  
- **Управление состоянием**: Redux Toolkit  
- **Drag & Drop** 
 

### **DevOps и Инструменты**
- **Среда разработки**: Visual Studio, VS Code  
- **Система контроля версий**: Git + GitHub  
- **CI/CD**: GitHub Actions (в процессе)  
- **Миграции БД**: EF Core Migrations  
- **Тестирование**: xUnit (бэкенд), Jest (фронтенд)  

---

## 🏗 **Архитектура проекта**  

### 📂 **Backend (ASP.NET Core)**
```
src/backend/
  ├── Core/                 # Бизнес-логика (модели, интерфейсы, сервисы)
  ├── Application/          # Реализация сервисов
  ├── Infrastructure/       # База данных, репозитории
  ├── Presentation/         # Контроллеры (API)
  ├── Kanban.API/           # Входная точка приложения
```
- **Контроллеры**: `AuthController`, `ProjectController`, `TaskController`, `UserController`  
- **Сервисы**: `AuthService`, `TaskService`, `ProjectService`  
- **Репозитории**: `IProjectRepository`, `ITaskRepository`  
- **Модели**: `User`, `Project`, `Task`, `Comment`, `Role`  

---

### 📂 **Frontend (React.js)**
```
src/frontend/
  ├── components/
  │   ├── Header.js
  │   ├── KanbanBoard.js
  │   ├── LoginForm.js
  │   ├── ProjectList.js
  │   ├── TaskForm.js
  ├── api/
  │   ├── TaskApi.js
  │   ├── ProjectApi.js
  │   ├── UserApi.js
  ├── styles/
  ├── App.js
  ├── index.js
```
- **KanbanBoard.js** — компонент для отображения задач (Drag & Drop)  
- **ProjectList.js** — список проектов пользователя  
- **LoginForm.js / RegistrationForm.js** — формы авторизации  
- **TaskForm.js** — форма создания задач  
- **API-интеграция** через `axios` в `TaskApi.js`, `ProjectApi.js`  

---

## 🔑 **Основной функционал**

### **1. Авторизация и роли**
✔ Регистрация и вход по **JWT**  
✔ Разделение прав: **Пользователь, Менеджер, Администратор**  
✔ Защищенные API-роуты  

### **2. Управление проектами**
✔ Создание, редактирование и удаление проектов  
✔ Фильтрация и поиск проектов  
✔ Разграничение доступа по ролям  

### **3. Kanban-доска**
✔ Перетаскивание задач между статусами **(Drag & Drop)**  
✔ Три колонки: **To Do, In Progress, Done**  
✔ Автоматическое сохранение изменений  

### **4. Задачи и комментарии**
✔ CRUD-операции для задач  
✔ Назначение задач пользователям  
✔ Лайки и комментарии к задачам  

### **5. Панель администратора**
✔ Управление пользователями (блокировка, изменение ролей)  
✔ Контроль за проектами и задачами  

---

## 🚀 **Как развернуть проект?**

### 📦 **Запуск через Docker**
1. Убедитесь, что у вас установлен **Docker**  
2. Выполните команду:
```bash
docker-compose up --build
```
Проект автоматически поднимет PostgreSQL, backend и frontend.  

---

### 🛠 **Запуск вручную (локально)**

1. **Склонируйте репозиторий**
```bash
git clone https://github.com/glebkapsutin/KanbanAPP.git
cd Kanban
```

2. **Настройте базу данных** в `appsettings.json`  
(укажите параметры подключения к PostgreSQL)  

3. **Примените миграции базы данных**  
```bash
dotnet ef database update
```

4. **Запустите backend**
```bash
cd server
dotnet restore
dotnet run
```

5. **Запустите frontend**
```bash
cd client
npm install
yarn install
npm run dev
```

 

---

## 🔮 **Планы на будущее**
✔ Подключить **WebSockets** для обновления задач в реальном времени  
✔ Добавить **Markdown**-редактор для комментариев  
✔ Улучшить UI (темная тема, адаптивность)  
✔ Подключить **email-уведомления** о новых комментариях  

---

## 💬 **Контакты**
👨‍💻 Автор: **Kapustin Gleb**  
📧 Email: gleb.kapustin1998@gmail.com  
🐙 GitHub: https://github.com/glebkapsutin  

📢 **Если у вас есть предложения или замечания, создавайте issue или pull request!**  
```

---
