import React, { Component } from 'react';

import UserManager from './UserManager.js';
import MainPage from './MainPage.js';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = { user: "0" }
  }




  render() {
    if (this.state.user === "0") {
      return (
        <UserManager user={this.state.user} setUser={this.setUser} />
      )
    }
    else {
      return (
          <MainPage user={this.state.user} setUser={this.setUser} />
      )
    }
  }

  setUser = (userId) => {
    this.setState({
      user: userId
    })
  }


}


export default App;
