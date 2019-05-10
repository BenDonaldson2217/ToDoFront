import React, { Component } from 'react';
import Message from './Message.js';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "0",
            userName: "",
            password: ""
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input type="userName" placeholder="Enter userName here" value={this.state.userName} required onChange={this.userNametype} />
                    <input type="password" placeholder="enter password" value={this.state.password} required onChange={this.passwordtype} />
                    <button type="button" onClick={this.attemptLogin} >Log in</button>
                </form>
                <Message number={this.state.status} />


            </div>
        )
    }


    attemptLogin = (e) => {

        if (this.state.userName === "" || this.state.password === "") {
            this.setState({ status: "-1", userName: "", password: "" })
        }
        else {
            let URL = "http://localhost:8080/api/v1/user/" + this.state.userName + "/" + this.state.password;
            let request = new XMLHttpRequest();
            request.open('Get', URL);
            request.responseType = "json";
            request.send();
            request.onload = () => {
                console.log(request.response)
                this.setState({ status: request.response.number, userName: "", password: "" })
                if (this.state.status > 0) {
                    this.props.setUser(this.state.status)
                }
                else {
                    this.setState({ status: "-1", userName: this.state.userName, password: this.state.password })
                }
            }
        }
    }

    userNametype = (e) => {
        this.setState({ status: this.state.status, userName: e.target.value, password: this.state.password })
    }

    passwordtype = (e) => {
        this.setState({ status: this.state.status, userName: this.state.userName, password: e.target.value })
    }


}