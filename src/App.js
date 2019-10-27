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
      shouldHide: true,
      getRequest: []
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
  }

  onChange = (event) => {
    this.setState({ address: event.target.value });
  }

  showLetter = (street, city) => {
    console.log(city);
    const db = firebase.firestore();
    let citiesRef = db.collection('voters');
    let arr = []
    let query = citiesRef.where('Voter Address Street', '==', street).where('Voter City', '==', city).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {

          arr.push(doc.data());
          this.setState({ shouldHide: false, getRequest: arr });
          // console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      console.log(arr);
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("submit called");
    if (this.state.ac) {
      let place = this.state.ac.getPlace();
      if (!place.geometry || place.formatted_address !== this.state.address) {
        console.log('Bad address ' + place.name);
        return;
      } else {
        console.log("Good address!");

        this.showLetter(place.address_components[0].long_name, place.address_components[1].long_name);
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
    return (
      <div>
        <div className="searchHeader" align="center">
          <h1>NeighborVote</h1>
          <p className="lead">Generate the best letter to encourage your neighbors to vote. </p>
          <form onSubmit={this.onSubmit}>
            <div className="input-group col-sm-8 col-sm-offset-2">
              <input value={this.state.address} onChange={this.onChange} id="searchTextField" type="text" className="form-control" placeholder="Your Connecticut address" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ display: (this.state.shouldHide ? 'none' : 'block') }} className="background">
          
            <Letter hasTable={this.state.shouldHide} getRequest={this.state.getRequest}/>
        </div>
        <div className="container explanation">
        <div>
          This project was inspired by a <a href="https://www.cambridge.org/core/journals/american-political-science-review/article/social-pressure-and-voter-turnout-evidence-from-a-largescale-field-experiment/11E84AF4C0B7FBD1D20C855972C2C3EB/share/fc0b0621ae1604b66e5589a3fa180c39dec185fb">paper</a> published in the American Political 
          Science Review by Alan S. Gerber, Donald P. Green and Christopher W. Larimer. 
          This study that found that mailing people the voting records of their neighbors significantly increases voter turnout, by about 8%. We 
          sought to apply this so that anyone could increase the political participation of people around them using this method. Connecticut voter files from <a href="https://connvoters.com/">connvoters.com</a>. 
        </div>
        </div>
      </div>

    );
  }
}