import React, { useState } from 'react';

function TaskForm(props) {
    const [value, setValue] = useState('');


    function onSubmit(event) {
        event.preventDefault();
        props.onSubmit(value);
        setValue('');
    }

    function onChange(event) {
        setValue(event.target.value);
    }

    return (
        <form className="col-md-10" onSubmit={onSubmit}>
            <article className="new-task-controller">
                <div>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Add new task..." 
                        value={value} 
                        onChange={onChange} 
                    />
                </div>
            </article>
        </form>
    );

}

export default TaskForm;