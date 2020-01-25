import React from "react";
import Modal from 'react-modal';
import API from "../../utils/API";
// import { Input, TextArea, FormBtn } from "../RegisterForm";
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color : 'blue'
  }
};

Modal.setAppElement('#root');

export default class LogInModal extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false,
      username: "",
      password: "",
      userLoggedIn: false,
      loggedUserName: "",
      loginError: "",
      usernameBlank: true,
      passwordBlank: true,
      usernameInvalid: false,
      passwordInValid: false,
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.sendLoginFormData = this.sendLoginFormData.bind(this);
  }

 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleUserNameChange = (event) =>{
    event.target.value ? this.setState({ usernameBlank: false, usernameInvalid: false }) : this.setState({ usernameBlank: true, usernameInvalid: true })
    this.setState({ username: event.target.value})
  }

  handlePassChange = (event) => {
    event.target.value ? this.setState({ passwordBlank: false, passwordInValid: false }) : this.setState({ passwordBlank: true, passwordInValid: true })
    this.setState({ password: event.target.value})
  }

  sendLoginFormData = (event) => {
    event.preventDefault()
    if (!this.state.usernameBlank && !this.state.passwordBlank){
      API.saveUser({
        username: this.state.username, password: this.state.password
      }).then(res => {
        if (res.data.incorrectUsername || res.data.incorrectPassword ){
          this.setState({ loginError: res.data.msg})
        }
        this.props.checkStatus(res.data.inSession, res.data.loggedUserName)
        this.setState({ userLoggedIn: res.data.inSession, loggedUserName: res.data.loggedUserName})
      }).catch(err => console.log(err))
    } else{
      this.setState({ usernameInvalid: true, passwordInValid: true})
    }
  }

  
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.firstName || !this.state.userName) {
      alert("Fill out your first and last name please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password ${this.state.firstName} ${this.state
          .userName}`
      );
    } else {
      alert(`Hello ${this.state.firstName} ${this.state.userName}`);
    }
    this.setState({
      firstName: "",
      userName: "",
      password: "",
      confirmPassword: ""
    });
  };
 
  render() {

  return (
    
      
      
      <div>
        <button onClick={this.openModal}>Login</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Welcome back!</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <br></br>
          <input
            value={this.state.userName}
            name="userName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />
          <br></br>
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input
            value={this.state.password}
            name="confirmPassword"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
         
          </form>
          <div className='col-sm-4 col-sm-offset-1 mt32'> 
        {this.state.userLoggedIn && <p> Welcome {this.state.loggedUserName} </p>}
        {!this.state.userLoggedIn && <form> 
          
          {this.state.loginError && <div className='alert alert-warning' role="alert"> 
            <p> <i className='fa fa-exclamation-triangle'> </i> <strong> {this.state.loginError} </strong> </p>
          </div>
          }

	        <h3 className='mb24'> Login </h3>

          <div className="form-group">
            <label htmlFor='username'> Username</label>
            <input type='text' placeholder='Username' name='username' className={'form-control'} onChange={this.handleUserNameChange} id='usernameInput' />
            {this.state.usernameInvalid && <p className='input-err'> ** Username Required</p>}
          </div>

          <div className="form-group">
            <label htmlFor='password'> Password</label>
            <input type='password' placeholder='****' name='password' className={'form-control'} onChange={this.handlePassChange} id='passwordInput' />
            {this.state.passwordInValid && <p className='input-err'> ** Password Required</p>}
          </div>
          
          <div className="form-group">
            <button type='submit' className='btn btn-primary' onClick={this.sendLoginFormData} id='loginBtn'> Login </button>
          </div>
        </form>  
        }
      </div>
        </Modal>
      </div>
  );
  }
}
