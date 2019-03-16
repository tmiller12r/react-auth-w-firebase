import React from 'react';

export default class Home extends React.Component {

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ..... DO YOUR LOGGED IN LOGIC
      }
      else {
        // ..... The user is logged out
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  render() {
    return <h1>Welcome home</h1>
  }
}

