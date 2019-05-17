import React, { Component } from 'react';
import Task from './Task.js';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            task: "",
        }
    }

    typingTask = (f) => {
        this.setState({
            tasks: this.state.tasks,
            task: f.target.value
        });

    }


    render() {


        if (this.props.listType !== 0) {
            return (
                <div>
                    <form>
                        <input type="text" value={this.state.task} id="taskinput" onChange={this.typingTask} placeholder="Add Item Here" /><button type="button" onClick={this.addTask}>+</button>
                    </form>
                    <table id="list">
                        <tbody>
                            <tr>
                                <th>Things to do</th>
                                <th>Completed?</th>
                                <th>Delete</th>
                            </tr>
                            {this.state.tasks
                                .filter((task) => (this.props.user === task.userID))
                                .filter((task) => (this.props.listType === task.listType))
                                .map((task, i) => <Task key={i} taskid={task.id} name={task.name} completed={task.completed} user={this.props.user} listCompleted={this.props.listCompleted} listType={this.props.listType} />)}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return ( 
                <h2>Please select or create a list!</h2>
            )
        }
    }


    componentDidMount() {
        this.loadList();

    }



    loadList = () => {
        let URL = "/api/v2/items";
        let request = new XMLHttpRequest();
        request.open('Get', URL);
        request.responseType = "json";
        request.send();
        request.onload = () => {
            this.setState({ tasks: request.response, task: this.state.task })

        }

    }



    addTask = (e) => {
        let URL = "/api/v2/items";
        let request = new XMLHttpRequest();
        let body = { name: this.state.task, userID: this.props.user, listType: this.props.listType };


        request.open('Post', URL);
        request.responseType = "json";
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));
        request.onload = () => {
            let newTasks = this.state.tasks
            newTasks.push(request.response)
            console.log(newTasks)
            this.setState({ tasks: newTasks, task: "" })

        }
    }






}
