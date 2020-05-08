import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            value: '',
            completed: '',
            type: ''
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
            type: (this.props.completed === true) ? 'completedTask' : 'activeTask'
        });
    }

    render() {
        return(
            <article id={this.state.id} className="task col-md-10" type={this.state.type}>
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