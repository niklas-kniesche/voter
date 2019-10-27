import React, { Component } from 'react';
import './Table.css';

export default class Letter extends Component {

	render() {
	        var people = this.props.getRequest;
	        if (people.length > 0) {
	        return (
	            <table className="table">
	              <thead>
	                <tr>
	                  <th scope="col">{people[0]["Voter Address Street"]}</th>
	                  <th scope="col"></th>
	                  <th scope="col">2017</th>
	                  <th scope="col">2018</th>
	                </tr>
	              </thead>
	              <tbody>
					{people.map((person, index) => {
	                  return (
	                  	<tr key={ index }>
	                  	  <td>{person["Voter Address Number"]}</td>
	                  	  <td>{person["First Name"] + " " + person["Last Name"]}</td>
	                  	  <td>{person["2017"] === "TRUE" ? "✔" : "✖" }</td>
	                  	  <td>{person["2018"] === "TRUE" ? "✔" : "✖" }</td>
	                  	</tr>
	                  	);
	                	})}
	              
	              </tbody>
	            </table>
	        );
	    } else {
	    	return (<div></div>)
	    }
	    }
}