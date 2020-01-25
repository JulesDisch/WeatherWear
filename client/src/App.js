import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import LoggedIn from "./pages/LoggedIn";
import NoMatch from "./pages/NoMatch";

import Nav from "./components/Nav";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inSession: false,
      loggedUserName: "",
      carDeleted: false,
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.destroyUserSession = this.destroyUserSession.bind(this)
  }

  componentDidMount() {
    this.checkInSession()
  } 

  checkInSession = () => {
    axios.get('/api/users').then((res) => {
      this.setState({ inSession: res.data.inSession });
    }).catch(err => console.log(err));
  }

  updateStatus = (boolStatus, username) => {
    this.setState({ inSession: boolStatus, loggedUserName: username });
  }

  destroyUserSession = (boolStatus) =>{
    this.setState({ inSession: boolStatus })
  }

  render() {
  return (
    <Router>
      <div>
        <Nav isLoggedIn={this.state.inSession} loggedUserName={this.state.loggedUserName} />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          <Route exact path="/users" component={LoggedIn} />
           <Route exact path="/users" component={LoggedIn} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
}
export default App;
