import React, { useState } from 'react';

const ProjectForm = ({ onAddProject }) => {
  const [ProjectName, SetTitle] = useState('');
  const [Description, SetDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ProjectName && Description) {
      console.log("Отправляем проект:", { ProjectName, Description });
      onAddProject({ name: ProjectName, description :Description });

      SetTitle('');
      SetDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок проекта"
        value={ProjectName}
        onChange={(e) => SetTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание проекта"
        value={Description}
        onChange={(e) => SetDescription(e.target.value)}
      />
      <button type="submit">Добавить проект</button>
    </form>
  );
};

export default ProjectForm;
