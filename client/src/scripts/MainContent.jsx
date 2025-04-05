import React from "react"; // Импортируем React
import Projects from "../components/Projects"; // Импорт компонента для отображения проектов
import TaskForm from "../components/TaskForm"; // Импорт формы для добавления задач
import TaskList from "../components/TaskList"; // Импорт компонента для отображения списка задач
import KanbanBoard from "../components/KanbanBoard"; // Импорт доски Kanban

// Основной компонент, который принимает пропсы:
// tasks — список задач
// selectedProject — текущий выбранный проект
// setSelectedProject — функция для изменения выбранного проекта
// handleAddTask — функция для добавления задач
// showProjects — флаг для отображения списка проектов
// showTasks — флаг для отображения задач
// setTasks — функция для обновления списка задач
const MainContent = ({
    tasks,
    selectedProject,
    setSelectedProject,
    handleAddTask,
    showProjects,
    showTasks,
    setTasks,
}) => {
    return (
        <main> {/* Основной контейнер для контента */}
            {/* Если нужно показать список проектов */}
            {showProjects && (
                <Projects
                    onSelectProject={setSelectedProject} // Передаем функцию для изменения выбранного проекта
                    selectedProject={selectedProject} // Передаем текущий выбранный проект
                />
            )}
  
            {/* Если проект выбран и нужно отображать задачи */}
            {selectedProject && showTasks && (
                <div>
                    {/* Форма для добавления задачи */}
                    <TaskForm
                        onAddTask={handleAddTask} // Передаем функцию для добавления задачи
                        selectedProject={selectedProject} // Передаем выбранный проект для добавления задачи
                    />
                    {/* Список задач, фильтруем по выбранному проекту */}
                    <TaskList
                        tasks={tasks.filter((task) => task.projectId === selectedProject)} // Фильтруем задачи по projectId
                    />
                    {/* Доска Kanban для отображения задач в формате Kanban */}
                    <KanbanBoard tasks={tasks} setTasks={setTasks} />
                </div>
            )}
        </main>
    );
};

export default MainContent; // Экспортируем компонент
