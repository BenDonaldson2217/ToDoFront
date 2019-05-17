import React, { Component } from 'react';
import Message from './Message.js';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "-3",
            userName: "",
            password: "",
            confirmpassword: ""
        }
    }

    render() {
        return (

            <div>
                <form>
                    <input type="userName" placeholder="Enter userName here" value={this.state.userName} required onChange={this.userNametype} />
                    <input type="password" placeholder="enter password" value={this.state.password} required onChange={this.passwordtype} />
                    <input type="password" placeholder="confirm password" value={this.state.confirmpassword} required onChange={this.confirmpasswordtype} />
                    <button type="button" onClick={this.attemptCreate} >SignUp</button>
                </form>
                <Message number={this.state.status} />

            </div>
        )
    }

    userNametype = (e) => {
        this.setState({ status: this.state.status, userName: e.target.value, password: this.state.password, confirmpassword: this.state.confirmpassword })
    }

    passwordtype = (e) => {
        this.setState({ status: this.state.status, userName: this.state.userName, password: e.target.value, confirmpassword: this.state.confirmpassword })

    }

    confirmpasswordtype = (e) => {
        this.setState({ status: this.state.status, userName: this.state.userName, password: this.state.password, confirmpassword: e.target.value })
    }

    attemptCreate = (e) => {

        if (this.state.password === "" || this.state.userName === "") {
            this.setState({
                status: "-3",
                userName: this.state.userName,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword
            })
        }

        else if (this.state.confirmpassword === this.state.password) {

            let checkURL = "/api/v1/users/" + this.state.userName;
            let checkRequest = new XMLHttpRequest();
            checkRequest.open('Get', checkURL);
            checkRequest.responseType = "json";
            checkRequest.send();
            checkRequest.onload = () => {
                if (checkRequest.response.number === 1) {
                    

                    let URL = "/api/v1/user";
                    let request = new XMLHttpRequest();
                    let body = { userName: this.state.userName, password: this.state.password };

                    request.open('Post', URL);
                    request.responseType = "json";
                    request.setRequestHeader("Content-Type", "application/json");
                    request.send(JSON.stringify(body));
                    request.onload = () => {
                        this.props.setUser(request.response.id);

                    }
                }
                else {
                    this.setState({
                status: "-4",
                userName: "",
                password:"",
                confirmpassword: ""
            })

                }
            }
        }
        else {
            this.setState({
                status: "-2",
                userName: this.state.userName,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword
            })
        }

    }


}
