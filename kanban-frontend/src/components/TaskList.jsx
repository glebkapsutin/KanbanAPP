import React from 'react';
import '../styles/Task.css'

const TaskList = ({tasks}) => {


  return (
    <div>
      <h1>Список задач</h1>
      <ul>
        {tasks.map((task,index) => (
          <li key={index}>
            <h2>{task.TaskName}</h2>
            <h3>{task.Description}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
