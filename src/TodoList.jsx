// src/TodoList.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      date: new Date(),
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'date') {
      return b.date - a.date;
    } else if (sort === 'alphabetical') {
      return a.text.localeCompare(b.text);
    } else {
      return 0;
    }
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}>
            <span
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.text.length > 20 ? task.text.slice(0, 20) + '...' : task.text}
            </span>
            <div className="task-buttons">
              <button onClick={() => openModal(task)}>View</button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
    </div>
  );
};

export default TodoList;
