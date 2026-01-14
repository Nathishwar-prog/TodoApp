import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, patchTask } from './services/taskService';
import { 
  Moon, Sun, Plus, Trash2, Check, X, 
  AlertCircle, Clock, Calendar, CheckCircle2 
} from 'lucide-react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      if (Array.isArray(data)) setTasks(data);
      else setTasks([]);
    } catch (err) {
      setError('Failed to load tasks');
      setTasks([]);
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
      if (res && res.task) {
        setTasks(prev => [res.task, ...prev]);
        // Add animation class
        setTimeout(() => {
          const newTaskElement = document.querySelector(`[data-task-id="${res.task._id}"]`);
          if (newTaskElement) {
            newTaskElement.classList.add('animate-slide-in');
          }
        }, 10);
      }
      setNewTask({ title: '', description: '', priority: 'Medium' });
    } catch {
      setError('Failed to create task');
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const onToggleComplete = async (task) => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      const res = await patchTask(task._id, { status: newStatus });
      if (res && res.task) {
        setTasks(prev => prev.map(t => t._id === res.task._id ? res.task : t));
      }
    } catch {
      setError('Failed to update task');
    }
  };

  // Group tasks by status
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  // Priority icon mapping
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'Low': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const TaskCard = ({ task }) => (
    <div 
      data-task-id={task._id}
      className={`
        group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl 
        transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 
        dark:border-gray-700 ${task.status === 'Completed' ? 'opacity-75' : ''}
      `}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <button
              onClick={() => onToggleComplete(task)}
              className={`
                mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center 
                justify-center transition-all duration-200
                ${task.status === 'Completed' 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                }
              `}
              aria-label={task.status === 'Completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.status === 'Completed' && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`
                text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1
                ${task.status === 'Completed' ? 'line-through text-gray-500 dark:text-gray-500' : ''}
              `}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2">
                <span className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                  ${getPriorityColor(task.priority)}
                `}>
                  {getPriorityIcon(task.priority)}
                  {task.priority}
                </span>
                
                <span className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                  ${task.status === 'Completed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }
                `}>
                  {task.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {task.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task._id)}
          className="
            flex-shrink-0 p-2 text-red-600 hover:text-red-700 dark:text-red-400 
            dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
            rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100
          "
          aria-label="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ✨ My Todo App
          </h1>
          
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400" role="alert">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto" aria-label="Dismiss error">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Add Task Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-500" />
            Add New Task
          </h2>
          
          <form onSubmit={onAdd} className="space-y-4">
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Title *
              </label>
              <input
                id="task-title"
                type="text"
                name="title"
                placeholder="Enter task title..."
                value={newTask.title}
                onChange={handleInputChange}
                className="
                  w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                "
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="task-description"
                name="description"
                placeholder="Add some details about this task..."
                value={newTask.description}
                onChange={handleInputChange}
                rows="3"
                className="
                  w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none
                "
              />
            </div>

            <div>
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="
                  w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                "
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="
                w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 
                hover:from-blue-600 hover:to-purple-700 text-white font-semibold 
                rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                transition-all duration-200 flex items-center justify-center gap-2
              "
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="space-y-8">
          {/* Pending Tasks Section */}
          {pendingTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Active Tasks
                </h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                  {pendingTasks.length}
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {pendingTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks Section */}
          {completedTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Completed Tasks
                </h2>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  {completedTasks.length}
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {completedTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create your first task to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
