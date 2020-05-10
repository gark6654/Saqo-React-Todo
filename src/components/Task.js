import React, { useState, useEffect } from 'react';

function Task(props) {
    const [id, setId] = useState(props.id);
    const [value, setValue] = useState(props.value);
    const [completed, setCompleted] = useState(props.completed);
    const [type, setType] = useState((props.completed) ? 'completedTask' : 'activeTask');
    // UI
    const [hover, setHover] = useState(props.hover);
    const [readOnly, setReadOnly] = useState(props.readOnly);

    useEffect(() => {
        updateStates();
    }, [props]);

    function updateStates() {
        setId(props.id);
        setValue(props.value);
        setCompleted(props.completed);
        setType(props.type);
    }

    function onChange(event) {
        props.updateTaskValue(id, event.target);
    }

    function mouseEnter() {
        setHover(true);
    }

    function mouseLeave() {
        setHover(false);
    }

    function doubleClick() {
        setReadOnly(false);
    }

    function focusOut() {
        setReadOnly(true);
    }

    return (
        <article
            className={`task col-md-10 ${type} ${(hover) ? 'hovered-task' : 'noneHovered-task'}`}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >
            <div>
                <button className="select-task" onClick={() => { props.completeTask(id) }}>
                    <span>
                        {completed && '✔️'}
                    </span>
                </button>
            </div>
            <div>
                <input type="text" value={value} className="form-control" readOnly={readOnly}
                    // Input functions 
                    onChange={onChange}
                    onBlur={focusOut}
                    onDoubleClick={doubleClick}
                />
            </div>
            <div>
                <button className="remove-task" onClick={() => { props.removeTask(id) }}>
                    🖕🏽
            </button>
            </div>
        </article>
    );
}

export default Task;