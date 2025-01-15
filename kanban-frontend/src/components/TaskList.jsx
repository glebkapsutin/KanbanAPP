import React from 'react'; // Импортируем React
import '../styles/Task.css'; // Импортируем стили для компонента

// Компонент TaskList, который принимает пропс tasks (список задач)
const TaskList = ({ tasks }) => {
  return (
    <div className='task-list'> {/* Оборачиваем все в контейнер с классом task-list */}
      <h1>Список задач</h1> {/* Заголовок для списка задач */}
      <ul> {/* Список задач */}
        {tasks && tasks.length > 0 ? ( // Проверка, есть ли задачи в списке
          tasks.map((task) => ( // Если задачи есть, проходим по массиву tasks
            <li key={task.id}> {/* Каждый элемент списка должен иметь уникальный key */}
              <h2>{task.taskName}</h2> {/* Название задачи */}
              <h3>{task.description}</h3> {/* Описание задачи */}
              <p><strong>Статус:{task.status}</strong> {}</p> {/* Статус задачи */}
            </li>
          ))
        ) : (
          <p>Задач пока нет</p> // Если задач нет, выводим сообщение
        )}
      </ul>
    </div>
  );
};

export default TaskList; // Экспортируем компонент
