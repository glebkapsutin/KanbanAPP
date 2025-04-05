import React, { useState } from 'react'; // Импортируем React и хук useState
import '../styles/Task.css'; // Импортируем стили для компонента
import { Button, Input, TextField } from '@mui/material';

const TaskForm = ({ onAddTask, selectedProject }) => {
  // useState - это хук, который используется для создания состояния компонента.
  // Изначально состояние для TaskName (название задачи) и Description (описание задачи) пустое.
  const [TaskName, SetTaskName] = useState(''); // Состояние для названия задачи
  const [Description, SetDescription] = useState(''); // Состояние для описания задачи

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // preventDefault предотвращает перезагрузку страницы при отправке формы
    console.log('Текущий выбранный проект:', selectedProject); // Выводим в консоль выбранный проект
    console.log("Отправляем задачу:", { TaskName, Description, projectId: selectedProject }); // Выводим данные задачи

    // Если проект не выбран (selectedProject = null или undefined), выводим предупреждение
    if (!selectedProject) {
      alert('Пожалуйста, выберите проект перед добавлением задачи!');
      return; // Выход из функции, если проект не выбран
    }

    // Если оба поля (название и описание задачи) заполнены, отправляем задачу
    if (TaskName && Description) {
      onAddTask({
        TaskName, // Название задачи
        Description, // Описание задачи
        projectId: selectedProject, // ID выбранного проекта
        status: 0, // Статус задачи по умолчанию (например, 0 - не начата)
      });

      // После отправки задачи очищаем поля формы
      SetTaskName(''); // Очищаем поле для названия задачи
      SetDescription(''); // Очищаем поле для описания задачи
    } else {
      console.error("Ошибка: Название задачи и описание не могут быть пустыми!"); // Ошибка, если поля пустые
    }
  };

  return (
    
      
        <TextField className="mt-4" onSubmit={handleSubmit}> 
          {/* Поле для ввода названия задачи */}
          <Input
            className="text-white" // Стили для поля ввода
            type="text" // Тип поля ввода - текст
            placeholder="Заголовок задачи" // Подсказка, что нужно ввести
            value={TaskName} // Значение поля - это состояние TaskName
            onChange={(e) => SetTaskName(e.target.value)} // При изменении значения обновляем состояние TaskName
          />
          {/* Поле для ввода описания задачи */}
          <Input
            className="text-white" // Стили для поля ввода
            type="text" // Тип поля ввода - текст
            placeholder="Описание задачи" // Подсказка для пользователя
            value={Description} // Значение поля - это состояние Description
            onChange={(e) => SetDescription(e.target.value)} // При изменении значения обновляем состояние Description
          />
          {/* Кнопка отправки формы */}
          <Button className="mt-4 text-white shadow-md ">
            Добавить задачу {/* Текст на кнопке */}
          </Button>
        </TextField>
     
    
  );
};

export default TaskForm; // Экспортируем компонент для использования в других частях приложения
