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
    <form className='form-main' onSubmit={handleSubmit}>
      <input className="input-main"
        type="text"
        placeholder="Заголовок проекта"
        value={ProjectName}
        onChange={(e) => SetTitle(e.target.value)}
      />
      <input className="input-main"
        type="text"
        placeholder="Описание проекта"
        value={Description}
        onChange={(e) => SetDescription(e.target.value)}
      />
      <button className="button_main" type="submit">Добавить проект</button>
    </form>
  );
};

export default ProjectForm;
