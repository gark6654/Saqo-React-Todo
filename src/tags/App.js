import React from 'react';
import $ from 'jquery';
import TaskForm from './TaskForm';
import Task from './Task';
import Controller from './Controller';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
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

    // Filtrates tasks 
    filtrateTasks(filter) {
        for (let i in this.state.tasks) {
            if ($('.task[id="' + i +'"]').hasClass('notShow')) {
                $('.task[id="' + i +'"]').removeClass('notShow');
            }
        }

        if (filter === 'Completed') {
            $('article[type="activeTask"]').addClass('notShow');
        }
        else if (filter === 'Active') {
            $('article[type="completedTask"]').addClass('notShow');
        }
    }

    // Create new task
    createNewTask(event) {
        event.preventDefault(); // Return false

        // Task info
        const input = $('.new-task-controller input');
        const completed = false;

        if (input.val() !== '') {
            let state = this.state.tasks;
            state.push({
                value: input.val(),
                completed: completed
            });

            this.setState({
                tasks: state
            });

            input.val('');
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
    updateTaskValue(id) {
        const input = $('input[id="' + id + '"]');
        const value = input.val();
        let stateTasks = this.state.tasks;;

        stateTasks[id].value = value;

        this.setState({
            tasks: stateTasks
        })

        if (value === '') {
            setTimeout(() => {
                if (input.val() === '') {
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

    render() {
        // Setup tasks for rendering...
        let tasks = [];
        let stateTasks = this.state.tasks;
        for (let i in stateTasks) {
            tasks.push(<Task key={i} id={i} value={stateTasks[i].value} completed={stateTasks[i].completed} removeTask={this.removeTask.bind(this)} completeTask={this.completeTask.bind(this)} updateTaskValue={this.updateTaskValue.bind(this)} />);
        }

        return (
            <article className="container">
                <center>
                    <h1>TODO LIST</h1>
                    <TaskForm onSubmit={this.createNewTask.bind(this)} />
                    {tasks}
                    {(tasks.length !== 0) ? <Controller count={tasks.length} completedCount={this.getCompletedsCount()} filtrate={this.filtrateTasks.bind(this)} removeCompleteds={this.removeCompleteds.bind(this)} /> : ''}
                </center>
            </article>
        )
    }
}

export default App;