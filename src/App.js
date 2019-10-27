/*global google*/
import React, { Component } from 'react';
import Letter from "./Letter";
import './App.css';
import firebase from './firebase.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      ac: null,
      shouldHide: true
    };
  }

  getAutocomplete = (event) => {
    console.log("getAutocomplete called");
    let place = this.autocomplete.getPlace();
    this.setState({ac: this.autocomplete});
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      // Do anything you like with what was entered in the ac field.
      console.log('You entered: ' + place.name);
      return;
    }

    console.log('You selected: ' + place.formatted_address);
    this.setState({ address: place.formatted_address });
  }

  initAutocomplete = (event) => {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchTextField'), 
      {types: ['address']

    });
    //this.autocomplete.setTypes(['address']);
    this.autocomplete.addListener('place_changed', (this.getAutocomplete));

  }

  componentDidMount = (event) => {
    this.initAutocomplete();
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

  onChange = (event) => {
    this.setState({ address: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("submit called");
    if (this.state.ac) {
      let place = this.state.ac.getPlace();
      console.log("From state" + this.state.addres);
      console.log("From address" + this.state.addres);
      if (!place.geometry || place.formatted_address !== this.state.address) {
        console.log('Bad address ' + place.name);
        return;
      } else {
        console.log("Good address!");
        let shouldHide = this.state.shouldHide;
        this.setState({ shouldHide: !shouldHide });
      }
    } else {
      console.log("bad address!");
    }
    
    this.setState({
      address: "",
    });
    console.log("we set the state to stuff");
  }

  render() {
    const shouldHide = this.state.shouldHide;
    return (
      <div>

        <div className="searchHeader" align="center">
          <h1>test</h1>
          <p className="lead">Input address which will show you certain things </p>
          <form onSubmit={this.onSubmit}>
            <div className="input-group col-sm-8 col-sm-offset-2">
              <input value={this.state.address} onChange={this.onChange} id="searchTextField" type="text" className="form-control" placeholder="Enter your Connecticut address" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ display: (shouldHide ? 'none' : 'block') }} className="background">
          
            <Letter />
        </div>
      </div>

    );
  }
}