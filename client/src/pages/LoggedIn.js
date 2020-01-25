import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class LoggedIn extends Component{
state = {
    user: {}
};

componentDidMount() {
    API.getUser(this.props.match.params.id)
      .then(res => this.setState({ user: res.data }),
      alert(`Hello  ${this.props.match.params.id} `))
      .catch(err => console.log(err));
  }
  render() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
<h1>You're logged in, 
  {this.state.user.dataValues.id} 
  </h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
}

export default LoggedIn;
