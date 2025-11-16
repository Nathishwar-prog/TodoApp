import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, patchTask } from './services/taskService';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.warn('API response is not an array:', data);
        setTasks([]);
      }
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
      setTasks([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const onAdd = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    try {
      const taskData = { ...newTask };
      const res = await createTask(taskData);
      // Ensure res.task exists and is valid
      if (res && res.task) {
        setTasks(prev => [res.task, ...prev]);
      }
      setNewTask({ title: '', description: '', priority: 'Medium' });
    } catch (e) {
      console.error('Error creating task:', e);
      setError('Failed to create task');
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (e) {
      console.error('Error deleting task:', e);
      setError('Failed to delete task');
    }
  };

  const onToggleComplete = async (task) => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      const res = await patchTask(task._id, { status: newStatus });
      // Ensure res.task exists and is valid
      if (res && res.task) {
        setTasks(prev => prev.map(t => t._id === res.task._id ? res.task : t));
      }
    } catch (e) {
      console.error('Error updating task:', e);
      setError('Failed to update task');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  
  return (
    <div className="container">
      <h1>Todo App</h1>
      
      <form onSubmit={onAdd} className="add-form">
        <h2>Add New Task</h2>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="tasks-list">
        <h2>Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task._id} className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => onToggleComplete(task)}
                    className={task.status === 'Completed' ? 'btn-uncomplete' : 'btn-complete'}
                  >
                    {task.status === 'Completed' ? 'Undo' : 'Complete'}
                  </button>
                  <button 
                    onClick={() => onDelete(task._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;