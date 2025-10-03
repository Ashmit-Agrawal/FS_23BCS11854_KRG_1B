import React, { useState, useEffect } from 'react';
import './index.css';

function ToDoApp() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    const addTask = (taskText) => {
        if (taskText.trim()) {
            const newTask = {
                text: taskText.trim(),
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        }
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(task => task.completed).length;
    const activeCount = tasks.length - completedCount;

    useEffect(() => {
        console.log('ToDoApp mounted');
    }, []);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        To-Do App
                    </h1>
                    <p className="text-gray-600">Organize your tasks efficiently</p>
                </div>

                {/* Add Task Input */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex gap-3">
                        <input 
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-3 "
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTask(inputValue);
                                }
                            }}
                        />
                        <button 
                            onClick={() => addTask(inputValue)}
                            className="px-6 py-3 bg-blue-500"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-xl shadow p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span>Total: <span className="font-semibold text-blue-600">{tasks.length}</span></span>
                        <span>Active: <span className="font-semibold text-orange-600">{activeCount}</span></span>
                        <span>Completed: <span className="font-semibold text-green-600">{completedCount}</span></span>
                    </div>
                </div>

                {/* Task List */}
                <div className="bg-white">
                    {tasks.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <p>No tasks yet. Add one above to get started!</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`w-6 h-6 rounded-full border-2 ${
                                                task.completed 
                                                    ? 'bg-green-500 ' 
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {task.completed && '✓'}
                                        </button>
                                        
                                        <div className="flex-1">
                                            <p className={`font-medium ${
                                                task.completed 
                                                    ? 'text-gray-500 line-through' 
                                                    : 'text-gray-800'
                                            }`}>
                                                {task.text}
                                            </p>
                                        </div>
                                        
                                        <button
                                            onClick={() => removeTask(task.id)}
                                            className="px-3 py-1 text-red-500"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>  
    );
}

export default ToDoApp;