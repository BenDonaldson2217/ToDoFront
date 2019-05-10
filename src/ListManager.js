import React, { Component } from 'react';
import MoreLists from './MoreLists.js';


export default class ListManager extends Component {
    constructor(props) {
        super(props);
        this.state = { newList: "", Lists: []};
    }


    render() {
        return (
            <div>
                <button type="button" onClick={this.changeCompletion}> Show {this.props.otherList} list</button>

                <ul>
                    <li><form>
                        <input type="text" value={this.state.newList} id="listinput" onChange={this.typingList} placeholder="Create a new list" /><button type="button" onClick={this.addList}>+</button>
                    </form></li>
                    {this.state.Lists
                    .filter((list) => (this.props.user=== list.userId))
                    .map(list => ( <MoreLists key={list.id} setList={this.props.setList} listType={list.listType} listId={list.id} setListType={this.props.setListType}/>))}





                    
                </ul>

            </div>





        )
    }




    changeCompletion = (e) => {
        this.props.setListCompleted(!this.props.listCompleted);
    }



    typingList = (e) => {
        this.setState({ Lists: this.state.Lists, newList: e.target.value })
    }

    addList = (e) => {
        let URL = "http://localhost:8080/api/v3/lists";
        let request = new XMLHttpRequest();
        let body = { listType: this.state.newList, userId: this.props.user };


        request.open('Post', URL);
        request.responseType = "json";
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));
        request.onload = () => {

            let newLists = this.state.Lists
            newLists.push(request.response)
            this.setState({ Lists: newLists, newList: "" })

            

        }
        
    }

    componentDidMount() {

        let URL = "http://localhost:8080/api/v3/lists";
        let request = new XMLHttpRequest();
        request.open('Get', URL);
        request.responseType = "json";
        request.send();
        request.onload = () => {
            this.setState({ Lists: request.response, newList: this.state.newList })

        }
    }





}