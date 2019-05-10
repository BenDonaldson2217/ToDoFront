import React, { Component } from 'react';
import SignUp from './SignUp.js';
import Login from './Login.js';

export default class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            state: this.props.user,
        };
    }
    render() {
        if (this.state.state === "0") {

            return (
                <div >
                    <h1>Welcome to ThingsToDo!</h1>
                    <button type="button" onClick={this.tryLogin}>Login</button>
                    <button type="button" onClick={this.trySignup}>Sign up</button>
                </div>
            )
        }
        else if (this.state.state === "1") {
            return (
                <div>
                    <Login setUser={this.props.setUser} />
                    <button type="button" onClick={this.trySignup}>Sign up</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <SignUp setUser={this.props.setUser} />
                    <button type="button" onClick={this.tryLogin}>Log in</button>
                </div>
            )
        }
    }


    tryLogin = (e) => {
        this.setState({ state: "1" });
    }

    trySignup = (e) => {
        this.setState({ state: "2" });
    }
}