import React from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import Controller from './Controller';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filter: 'All'
        };
    }

    componentDidMount() {
        if (localStorage.getItem('tasks') !== null) {
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            });
        }
        else {
            localStorage.setItem('tasks', JSON.stringify('[]'));
        }
    }

    // Save tasks to localStorage
    saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    // Create new task
    createNewTask(value) {
        if (value !== '') {
            let state = this.state.tasks;
            state.push({
                value: value,
                completed: false
            });

            this.setState({
                tasks: state
            });

            this.saveToStorage();
        }
    }

    // Remove task by button click
    removeTask(id) {
        let stateTasks = this.state.tasks;
        stateTasks.splice(id, 1);
        this.setState({
            tasks: stateTasks
        });
        this.saveToStorage();
    }

    // Remove all completed tasks
    removeCompleteds() {
        let tasks = this.state.tasks;
        let arr = [];

        for (let i in tasks) {
            if (tasks[i].completed !== true) {
                arr.push(tasks[i]);
            }
        }
        this.setState({
            tasks: arr
        });

        localStorage.setItem('tasks', JSON.stringify(arr));
    }

    // Complete task by button Click
    completeTask(id) {
        let stateTasks = this.state.tasks;
        stateTasks[id].completed = !stateTasks[id].completed;

        this.setState({
            tasks: stateTasks
        });
        this.saveToStorage();
    }

    // Change task value 
    updateTaskValue(id, input) {
        const value = input.value;
        let stateTasks = this.state.tasks;

        stateTasks[id].value = value;

        this.setState({
            tasks: stateTasks
        })

        if (value === '') {
            setTimeout(() => {
                if (input.value === '') {
                    this.removeTask(id);
                }
            }, 1000);
        }

        this.saveToStorage();
    }

    // Get completeds task count 
    getCompletedsCount() {
        let count = 0;
        for (let i in this.state.tasks) {
            if (this.state.tasks[i].completed) {
                count++;
            }
        }
        return count;
    }

    // Filtrates tasks 
    filtrateTasks(btnFilter) {
        this.setState({
            filter: btnFilter
        });
    }

    // Get Tasks after filtrate
    getFIltratedTasks() {
        const stateTasks = this.state.tasks;
        const filter = this.state.filter;

        if (filter === 'All') {
            return stateTasks;
        }
        else if (filter === 'Completed') {
            return stateTasks.filter((task) => task.completed);
        }
        else if (filter === 'Active') {
            return stateTasks.filter((task) => !task.completed);
        }
    }

    render() {
        // Setup tasks for rendering...
        const tasks = this.getFIltratedTasks();
        const count = this.state.tasks.length;

        return (
            <article className="container">
                <center>
                    <h1>TODO LIST</h1>
                    <TaskForm onSubmit={this.createNewTask.bind(this)} />
                    {tasks.map((task, i) => (
                        <Task
                            key={i}
                            id={i}
                            value={task.value}
                            completed={task.completed}
                            removeTask={this.removeTask.bind(this)}
                            completeTask={this.completeTask.bind(this)}
                            updateTaskValue={this.updateTaskValue.bind(this)}
                        />
                    ))}
                    {(count !== 0) && (
                        <Controller
                            count={count}
                            completedCount={this.getCompletedsCount()}
                            filtrate={this.filtrateTasks.bind(this)}
                            removeCompleteds={this.removeCompleteds.bind(this)}
                        />
                    )}
                </center>
            </article>
        )
    }
}

export default App;