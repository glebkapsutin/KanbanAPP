import React,{useState} from 'react';
import '../styles/Task.css'

const TaskForm = ({onAddTask}) =>{

    const[TaskName,SetTitle] = useState('');
    const[Description,SetDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (TaskName && Description) {
            console.log("Отправляем задачу:", { TaskName, Description }); // Добавьте лог для отладки
            onAddTask({ TaskName, Description });
    
            SetTitle('');
            SetDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type = "text"
                placeholder='Заголовок задачи'
                value = {TaskName}
                onChange={(e) => SetTitle(e.target.value)}
            />
            <input
                type = "text"
                placeholder='Описание задачи'
                value = {Description}
                
                onChange={(e) => SetDescription(e.target.value)}
            />
            <button type="submit">Добавить задачу</button>
        </form>
    );
};
export default TaskForm;