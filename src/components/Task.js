import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            value: '',
            completed: '',
            type: '',
            hover: false
        };
    }

    componentDidMount() {
        this.updateStates();
    }

    componentDidUpdate(nextProps) {
        if (this.props !== nextProps) {
            this.updateStates();
            return true;
        }
        else {
            return false;
        }
    }

    updateStates() {
        this.setState({
            id: this.props.id,
            value: this.props.value,
            completed: this.props.completed,
            type: (this.props.completed === true) ? 'completedTask' : 'activeTask',
            hover: false
        });
    }

    // Functions under this line works only for style or view
    
    // Mouse hover from task
    mouseEnter() {
        this.setState({
            hover: true
        });
    }

    // Mouse leave from task
    mouseLeave() {
        this.setState({
            hover: false
        });
    }

    render() {
        return(
            <article id={this.state.id} className={(this.state.hover === true) ? 'task col-md-10 hovered-task' : 'task col-md-10 noneHovered-task'} type={this.state.type} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                <div>
                    <button className="select-task" id={this.state.id} onClick={() => {this.props.completeTask(this.state.id)}}>
                        <span>
                            {(this.props.completed === true) ? '✔️' : ''}
                        </span>
                    </button>
                </div>
                <div>
                    <input type="text" id={this.state.id} value={this.state.value} className="form-control" readOnly onChange={() => {this.props.updateTaskValue(this.state.id)}} />
                </div>
                <div>
                    <button className="remove-task" id={this.state.id} onClick={() => {this.props.removeTask(this.state.id)}}>
                        🖕🏽
                    </button>
                </div>
            </article>
        );
    }
}


export default Task;