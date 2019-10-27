import React, { Component } from 'react';
import './Table.css';

export default class Letter extends Component {

	render: function() {
	        var names = ['Jake', 'Jon', 'Thruster'];
	        return (
	            <ul>
	                {names.map((name, index) => {
	                    return <li key={ index }>{name}</li>;
	                  })}
	            </ul>
	        )
	    }

}