import React, { Component } from 'react';
import './Letter.css';
import Table from "./Table";

export default class Letter extends Component {
	getDate = (event) => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	createTable = (event) => {
		if(!this.props.hasTable) {

		}
	}

	render() {
		this.createTable();
		let person = this.props.getRequest;
		return (
			<div className="letter container">
				<div className="sender">
					<p>NeighborVote</p>
				</div>

				<p>{this.getDate()}</p>

				<div className="recipient">

				</div>
				<div className="main-text">
					<p>Dear Registered Voter: </p>
					<p>What if your neighbors knew if you voted or not?</p>
					<p>Why do so many people fail to vote? We've been talking about the problem for years, but it only seems to get worse. This year, we're taking a new approach. We're sending this mailing to you and your neighbors to publicize who does and does not vote.</p>
					<p> The chart shows the names of some of your neighbors, showing which have voted in
 						the past. After the August 8 election, we intend to mail an updated chart. You
 						and your neighbors will all know who voted and who did not.
					</p>
				</div>
				<div className="table-wrapper" >
					<Table getRequest={this.props.getRequest}/>
				</div>
			</div>
		);
	}
}