import React,{useState,useEffect} from 'react'
import './styles/App.css'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

import { fetchTasks,addTask } from './api/TaskApi';


const App = () => {
  const [tasks,setTasks] = useState([]);

  const handleAddTask =(newTask)=>{
    addTask(newTask,tasks,setTasks);

  };
 
  useEffect(() => {
    fetchTasks(setTasks);

  }, []);

  return (
    <div>
      
      <h1>KanbanApp</h1>
    
      
      <TaskForm onAddTask = {handleAddTask}/>
      <TaskList tasks = {tasks}/>
      
     
      
    </div>
  );
};

export default App;
