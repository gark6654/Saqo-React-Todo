import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import Controller from './Controller';

function App(props) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        if (localStorage.getItem('tasks') !== null) {
            setTasks([...JSON.parse(localStorage.getItem('tasks'))]);
        }
        else {
            localStorage.setItem('tasks', JSON.stringify('[]'));
        }
    }, [props]);

    // Save tasks to storage
    function saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create new task
    function createNewTask(value) {
        if (value !== '') {
            let state = tasks;
            state.push({
                value: value,
                completed: false
            });

            setTasks([...state]);

            saveToStorage();
        }
    }

    // Remove task by button click
    function removeTask(id) {
        let stateTasks = tasks;
        stateTasks.splice(id, 1);

        setTasks([...stateTasks]);
        saveToStorage();
    }

    // Remove all completed tasks
    function removeCompleteds() {
        let stateTask = tasks;
        let arr = [];

        for (let i in stateTask) {
            if (stateTask[i].completed !== true) {
                arr.push(stateTask[i]);
            }
        }
        setTasks([...arr]);

        localStorage.setItem('tasks', JSON.stringify(arr));
    }

    // Complete task by button Click
    function completeTask(id) {
        let stateTasks = tasks;
        stateTasks[id].completed = !stateTasks[id].completed;

        setTasks([...stateTasks]);
        saveToStorage();
    }

    // Change task value 
    function updateTaskValue(id, input) {
        const value = input.value;
        let stateTasks = tasks;

        stateTasks[id].value = value;

        setTasks([...stateTasks]);

        if (value === '') {
            setTimeout(() => {
                if (input.value === '') {
                    removeTask(id);
                }
            }, 1000);
        }

        saveToStorage();
    }

    // Get completeds task count 
    function getCompletedsCount() {
        let count = 0;
        for (let i in tasks) {
            if (tasks[i].completed) {
                count++;
            }
        }
        return count;
    }

    // Filtrates tasks 
    function filtrateTasks(btnFilter) {
        setFilter(btnFilter);
    }

    // Get Tasks after filtrate
    function getFIltratedTasks() {
        if (filter === 'All') {
            return tasks;
        }
        else if (filter === 'Completed') {
            return tasks.filter((task) => task.completed);
        }
        else if (filter === 'Active') {
            return tasks.filter((task) => !task.completed);
        }
    }

    // Setup tasks for rendering
    const filtratedTasks = getFIltratedTasks();
    const count = tasks.length;

    return (
        <article className="container">
            <center>
                <h1>TODO LIST</h1>
                <TaskForm onSubmit={createNewTask} />
                {filtratedTasks.map((task, i) => (
                    <Task
                        key={i}
                        id={i}
                        value={task.value}
                        completed={task.completed}
                        removeTask={removeTask}
                        completeTask={completeTask}
                        updateTaskValue={updateTaskValue}
                    />
                ))}
                {(count !== 0) && (
                    <Controller
                        count={count}
                        completedCount={getCompletedsCount}
                        filtrate={filtrateTasks}
                        removeCompleteds={removeCompleteds}
                    />
                )}
            </center>
        </article>
    );
}


export default App;