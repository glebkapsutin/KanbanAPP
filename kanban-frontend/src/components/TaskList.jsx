import React from 'react';
import '../styles/Task.css';


const TaskList = ({ tasks }) => {
  return (
    <div className='task-list'>
      <h1>Список задач</h1>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.taskName}</h2>
              <h3>{task.description}</h3>
              <p><strong>Статус:{task.status}</strong> {}</p>
            </li>
          ))
        ) : (
          <p>Задач пока нет</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
