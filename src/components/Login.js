import React, { useEffect, useState } from "react";
import axios from 'axios';



class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  state = {
    login: {
      username: '',
      password: ''
    },
    error: ''
  };
  
  handleChange = (evt) => {
    this.setState({
      login: {
        ...this.state.login,
        [evt.target.name]:evt.target.value
      }
    });
  };

  login = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:5000/api/login', this.state.login)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/bubblepage')
      })
      .catch(err=>{
        console.log(err);
        this.setState({
          ...this.state,
          error:'Username or Password not valid'
        })
      });
  };

  componentDidMount(){
    return localStorage.getItem('token') ? this.props.history.push('/bubblepage') : null  
  }
  // useEffect(()=>{
  //   login()
  //   // make a post request to retrieve a token from the api
  //   // when you have handled the token, navigate to the BubblePage route
  // });
  
    
  //replace with error state

  render (){
    return (
        <div>
          <h1>Welcome to the Bubble App!</h1>
          <div data-testid="loginForm" className="login-form">
            <h2>Login</h2>
            <form onSubmit={this.login}>
              <input
                data-testid="username"
                type="text"
                name="username"
                value={this.state.login.username}
                onChange={this.handleChange}
              />
              <input
                data-testid="password"
                type="password"
                name="password"
                value={this.state.login.password}
                onChange={this.handleChange}
              />
              <button>Log in</button>
            </form>
          </div>

          <p data-testid="errorMessage" className="error">
            {this.state.error}
          </p>
        </div>
    );
  }  
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.