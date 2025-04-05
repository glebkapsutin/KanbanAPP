import React, { useState } from 'react';

// Компонент формы для добавления нового проекта
const ProjectForm = ({ onAddProject }) => {
  // Состояния для хранения данных формы (название проекта и описание)
  const [ProjectName, SetTitle] = useState('');
  const [Description, SetDescription] = useState('');

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    // Если оба поля заполнены, отправляем данные проекта
    if (ProjectName && Description) {
      console.log("Отправляем проект:", { ProjectName, Description });
      onAddProject({ name: ProjectName, description: Description }); // Вызываем функцию onAddProject и передаем данные

      // Очищаем поля формы после отправки
      SetTitle('');
      SetDescription('');
    }
  };

  return (
    <form className='form-main' onSubmit={handleSubmit}>
      {/* Поле для ввода названия проекта */}
      <input
        className="input-main"
        type="text"
        placeholder="Заголовок проекта"
        value={ProjectName}
        onChange={(e) => SetTitle(e.target.value)} // Обновляем состояние при изменении
      />
      {/* Поле для ввода описания проекта */}
      <input
        className="input-main"
        type="text"
        placeholder="Описание проекта"
        value={Description}
        onChange={(e) => SetDescription(e.target.value)} // Обновляем состояние при изменении
      />
      {/* Кнопка для отправки формы */}
      <button className="button_main" type="submit">Добавить проект</button>
    </form>
  );
};

export default ProjectForm;
