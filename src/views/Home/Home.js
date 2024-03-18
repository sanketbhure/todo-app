import React, { useEffect, useState } from 'react'
import "./Home.css"
import addIcon from "./add.png"
import TaskCard from '../../components/TaskCard/TaskCard';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const addTask = () => {
    if (newTask === '') {
      setError('Please enter a task')
      return
    }
    else if (newTask.length < 5) {
      setError('Task should be at least 5 charecters long')
      return
    }
    else {
      setError('')
    }
    setTasks([
      {
        title: newTask,
        category: category,
      },
       ...tasks])
    setNewTask('')
    setCategory('')
  }

  const saveTaskToLS = (tasksToSave)=>{
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }

  const deleteTask = (index) => {
    const newTasks = tasks;
    newTasks.splice(index, 1);
    setTasks([...newTasks]);
    saveTaskToLS(newTasks);
  }

  useEffect(()=>{
    if(tasks.length === 0){
      return
    }

   saveTaskToLS(tasks);
  },[tasks])

  useEffect(()=>{
    const tasks = localStorage.getItem('tasks');
    if(tasks){
      setTasks(JSON.parse(tasks));
    }
  }, [])

  return (
    <div>
      <h1 className='app-heading'>ToDo App</h1>

      <div className='tasks-container'>
        {
          tasks.map((task, i) => {
            const {title, category} = task;
            return (<TaskCard 
              title={title} 
              category={category} 
              key={i} 
              delFunction={deleteTask} 
              index={i} />)
          })
        }

      </div>
      <p className='error-message'>{error}</p>
      <div className='input-container'>
        <input type='text' placeholder='Add a new task' className='task-input'
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value)
          }}
        />

        <select className='category-select' value={category} onChange={(e)=>{
          setCategory(e.target.value)
        }}>
          <option value=''>Category</option>
          <option value='📚 Study'>📚 Study</option>
          <option value='🛒 Shopping'>🛒 Shopping</option>
          <option value='🎯 Goals'>🎯 Goals</option>
          <option value='🎨 Hobby'>🎨 Hobby</option>
        </select>


        <img src={addIcon} alt='Add' className='add-icon' onClick={addTask} />
      </div>
    </div>
  )
}

export default Home