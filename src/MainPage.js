import React, { Component } from 'react';
import List from './List.js'
import ListManager from './ListManager.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Container } from 'react-bootstrap';
import './App.css';


export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCompleted: false,
            otherList: "done",
            listType: 0
        }
    }


    render() {

        return (
            <Container>
                <Row>
                    <Col md={3} >
                        <button type="button" onClick={this.logOut} >Log out</button>

                    </Col>
                    <Col md={9}>
                        <h1>Stufftodo!</h1>
                    </Col>



                </Row>
                <Row>
                    <Col md={3} >
                        <ListManager user={this.props.user} setListCompleted={this.setListCompleted} listCompleted={this.state.listCompleted} otherList={this.state.otherList} setListType={this.setListType} />
                    </Col>
                    <Col md={9} >

                        <List listCompleted={this.state.listCompleted} user={this.props.user} listType={this.state.listType} />
                    </Col>
                </Row>
            </Container>
        )
    }

    setListCompleted = (newListCompleted) => {
        if (newListCompleted) {
            this.setState({
                listCompleted: newListCompleted,
                otherList: "to do",
                listType: this.state.listType
            })
        }
        else {
            this.setState({
                listCompleted: newListCompleted,
                otherList: "done",
                listType: this.state.listType
            })
        }
    }

    setListType = (newListType) => {
        this.setState({
            listCompleted: this.state.listCompleted,
            otherList: this.state.otherList,
            listType: newListType
        })
    }

    logOut = () => {
        this.props.setUser("0");
    }
}