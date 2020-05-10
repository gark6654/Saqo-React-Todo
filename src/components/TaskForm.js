import React from 'react';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }


    // Form Submit
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({
            value: ''
        });
    }


    // Input value change
    onChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <form className="col-md-10" onSubmit={this.onSubmit.bind(this)}>
                <article className="new-task-controller">
                    <div>
                        <input type="text" placeholder="Add new task..." className="form-control" value={this.state.value} onChange={this.onChange.bind(this)} />
                    </div>
                </article>
            </form>
        );
    }
}



export default TaskForm;