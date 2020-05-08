import React from 'react';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = props.onSubmit;
    }

    render() {
        return (
            <form className="col-md-10" onSubmit={this.onSubmit} >
                <article className="new-task-controller">
                    <div>
                        <input type="text" placeholder="Add new task..." className="form-control" />
                    </div>
                </article>
            </form>
        );
    }
}



export default TaskForm;