import React, { Component } from 'react';

export default class Message extends Component {

    render() {
        if( this.props.number === "0") {
            return (
                <p>Please enter your username and password.</p>
            )
        }
        else if (this.props.number === "-1") {
            return (
                <p> The username or password you entered is incorrect</p>
            )
        }
        else if (this.props.number === "-2"){
            return(
            <p> Passwords do not match, please try again</p>
            )
        }
        else if (this.props.number === "-3"){
            return(

            <p> Please fill in the form</p>
            )
        }
        else if (this.props.number === "-4"){
            return(

            <p> Username is already in use</p>
            )
        }


        else {return (
            <p>Logged in successfully</p>
        )}

    }

}