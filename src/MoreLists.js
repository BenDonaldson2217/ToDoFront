import React, { Component } from 'react';

export default class MoreLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
        };
    }


    render() {
        if (this.state.deleted === false) {
            return (
                <li>
                    <button type="button" onClick={this.setList} className={this.props.listId}> Show {this.props.listType} list</button>
                    <button type="button" onClick={this.deleteList} className={this.props.listId}>Delete List</button>
                </li>
            )
        }
        else {
            return (
                null
            )
        }
    }




    deleteList = (e) => {
        let id = e.target.className;

        let URL = "http://localhost:8080/api/v3/lists/" + id;
        let request = new XMLHttpRequest();
        request.open('Delete', URL);
        request.responseType = "json";
        request.send();
        request.onload = () => {
            this.setState({
                deleted: true

            })
            if (id === this.props.listId.toString(10)) {
                this.props.setListType(0);
            }
        }
    }
    setList = (e) => {
        this.props.setListType(this.props.listId)

    }
}
