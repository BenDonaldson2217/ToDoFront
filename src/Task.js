import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
            completed: this.props.completed
        };
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        if (this.state.deleted === true || this.state.completed !== this.props.listCompleted) {
            return (null)

        }
        else {
            return (
                <tr>
                    <td id={this.props.taskid}>
                        {this.props.name}
                    </td>
                    <td>
                        <button type="button" className={this.props.taskid} onClick={this.completed}> Completed</button>
                    </td>
                    <td>
                        <button type="button" className={this.props.taskid} onClick={this.deleted}> Delete</button>
                    </td>
                </tr>
            )
        }
    }


    deleted = () => {
        let URL = "http://localhost:8080/api/v2/items/" + this.props.taskid;
        let request = new XMLHttpRequest();
        request.open('Delete', URL);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.onload = () => {
            this.setState({ deleted: true });
        }
    }

    completed = () => {
        let URL = "http://localhost:8080/api/v2/items/" + this.props.taskid;
        let request = new XMLHttpRequest();
        request.open('Put', URL);
        request.setRequestHeader("Content-Type", "application/json");
        let body = {
            id: this.props.taskid,
            name: this.props.name,
            completed: !this.state.completed,
            userID: this.props.user,
            listType: this.props.listType
        }
        request.responseType = "json";
        request.send(JSON.stringify(body));
        request.onload = () => {
            this.setState({
                deleted: this.state.deleted,
                completed: !this.state.completed
            })
        }

    }






}
