import React from 'react';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            completedCount: 0
        }
    };

    componentDidMount() {
        this.setState({
            count: this.props.count,
            completedCount: this.props.completedCount
        });
    }

    componentDidUpdate(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                count: this.props.count,
                completedCount: this.props.completedCount
            });
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return(
            <article className="col-md-10" id="controller">
                <div>
                    <h6>
                        Task Count: <b>{this.state.count}</b>
                    </h6>
                </div>
                <div id="filters">
                    <span>Filters:</span>
                    <button className="btn btn-warning" onClick={() => {this.props.filtrate('All')}}>All</button>
                    <button className="btn btn-success" onClick={() => {this.props.filtrate('Completed')}}>Completed</button>
                    <button className="btn btn-danger" onClick={() => {this.props.filtrate('Active')}}>Active</button>
                    {(this.state.completedCount !== 0) ? <button className="btn" onClick={() => {this.props.removeCompleteds()}}>Clear All Completeds</button> : ''}
                </div>
            </article>
        );
    };
}

export default Controller;