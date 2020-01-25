import React from "react";
import RegisterModal from "../RegisterModal";
import LogInModal from "../LogInModal";

export default class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
    }
  }
  render(){
  return (
    <nav className="navbar fixed-top navbar-light navbar-expand bg-white border-bottom border-width-2">
      <a className="navbar-brand" href="/">
       Weather Wear
      </a>
      <div className="collapse navbar-collapse justify-content-end">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">About</a>
                    </li>
                   <RegisterModal />
                   <LogInModal />
                   {this.props.isLoggedIn && <li> <a> {this.props.loggedUserName} </a> </li> }
                </ul>
            </div>

    </nav>
  );
}
}

