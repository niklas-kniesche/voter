import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';

class App extends Component {

  componentDidMount = (event) => {
    const db = firebase.firestore();
    var docRef = db.collection("voters").doc("voter1");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  render() {
    return (
      <div className='app'>
      </div>
    );
  }
}
export default App;