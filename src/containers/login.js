import React from 'react';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

  state = {
    email:'',
    password:'',
    error: ''
  }

  // handleEmailChange = (e) => {
  //   this.setState({ email: e.target.value });
  // }

  // handlePasswordChange (e) => {
  //   this.setState({ password: e.target.value });
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
// [e.target.name] above is shorthand for:
// const obj ={}
//  obj.password =
//  obj['password'] = e.target.value; OR
//  obj[e.target.name] = e.target.value;

handleSubmit = (e) => {
  e.preventDefault();

  const {email, password } = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log('Returns: ', response);
    })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
        // console.log(err);
      })
  }
  // this is how we access firebase - firebase.auth()
  // createUserWithEmailAndPassword is a promise

componentDidMount() {
  this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // ..... DO YOUR LOGGED IN LOGIC
      this.props.history.push('/')
    }
    else{
      // .....The user is logged out
    }
  })
}

componentWillUnmount() {
  this.unsubscribe();
}

  render() {
    const { email, password, error } = this.state;
    const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

      return (
      <>
      {displayError}
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </>
    )
  }
}