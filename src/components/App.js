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
        if (stateTasks[id].completed === true) {
            stateTasks[id].completed = false;
        }
        else {
            stateTasks[id].completed = true;
        }

        this.setState({
            tasks: stateTasks
        });
        this.saveToStorage();
    }

    // Change task value 
    updateTaskValue(id, input) {
        const value = input.value;
        let stateTasks = this.state.tasks;;

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
            if (this.state.tasks[i].completed === true) {
                count++;
            }
        };
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
        let tasks = [];
        const stateTasks = this.state.tasks;
        const filter = this.state.filter;

        if (filter === 'All') {
            for (let i in stateTasks) {
                tasks.push(<Task key={i} id={i} value={stateTasks[i].value} completed={stateTasks[i].completed} removeTask={this.removeTask.bind(this)} completeTask={this.completeTask.bind(this)} updateTaskValue={this.updateTaskValue.bind(this)} />);
            }
        }
        else if (filter === 'Completed') {
            for (let i in stateTasks) {
                if (stateTasks[i].completed === true) {
                    tasks.push(<Task key={i} id={i} value={stateTasks[i].value} completed={stateTasks[i].completed} removeTask={this.removeTask.bind(this)} completeTask={this.completeTask.bind(this)} updateTaskValue={this.updateTaskValue.bind(this)} />);
                }
            }
        }
        else if (filter === 'Active') {
            for (let i in stateTasks) {
                if (stateTasks[i].completed === false) {
                    tasks.push(<Task key={i} id={i} value={stateTasks[i].value} completed={stateTasks[i].completed} removeTask={this.removeTask.bind(this)} completeTask={this.completeTask.bind(this)} updateTaskValue={this.updateTaskValue.bind(this)} />);
                }
            }
        }

        return {
            tasks: tasks,
            count: stateTasks.length
        };
    }

    render() {
        // Setup tasks for rendering...
        const get = this.getFIltratedTasks();
        let tasks = get.tasks;

        return (
            <article className="container">
                <center>
                    <h1>TODO LIST</h1>
                    <TaskForm onSubmit={this.createNewTask.bind(this)} />
                    {tasks}
                    {(get.count !== 0) ? <Controller count={get.count} completedCount={this.getCompletedsCount()} filtrate={this.filtrateTasks.bind(this)} removeCompleteds={this.removeCompleteds.bind(this)} /> : ''}
                </center>
            </article>
        )
    }
}

export default App;