import React, { useState, useEffect } from 'react';

function Controller(props) {
    const [count, setCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);


    useEffect(() => {
        setCount(props.count);
        setCompletedCount(props.completedCount);
    }, [props]);

    return (
        <article>
            <article className="col-md-10" id="controller">
                <div>
                    <h6>
                        Task Count: <b>{count}</b>
                    </h6>
                </div>
                <div id="filters">
                    <span>Filters:</span>
                    <button
                        className="btn btn-warning"
                        onClick={() => {props.filtrate('All')}}>All
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => {props.filtrate('Completed')}}>Completed
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {props.filtrate('Active')}}>Active
                    </button>
                    {(completedCount !== 0) && <button className="btn" onClick={() => {props.removeCompleteds()}}>Clear All Completeds</button>}
                </div>
            </article>
        </article>
    );
}


export default Controller;