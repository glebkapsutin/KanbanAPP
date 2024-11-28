import React, { useState } from 'react';
import '../styles/Task.css';

const TaskForm = ({ onAddTask, selectedProject }) => {
  const [TaskName, SetTaskName] = useState('');
  const [Description, SetDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Текущий выбранный проект:', selectedProject);
    console.log("Отправляем задачу:", { TaskName, Description, projectId: selectedProject});

    if (!selectedProject) {
      alert('Пожалуйста, выберите проект перед добавлением задачи!');
      return;
    }

    if (TaskName && Description ) {
      onAddTask({
        TaskName,
        Description,
        projectId: selectedProject, // Убедитесь, что ID проекта передается
      });

      SetTitle('');
      SetDescription('');
    }
    else {
        console.error("Ошибка: отсутствует Project ID или другие поля!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок задачи"
        value={TaskName}
        onChange={(e) => SetTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание задачи"
        value={Description }
        onChange={(e) => SetDescription(e.target.value)}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default TaskForm;
