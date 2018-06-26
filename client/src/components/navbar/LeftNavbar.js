import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';

class leftSide extends Component {

	constructor() {
		super();
	}

	logoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	}

	addActive = (e) => {
		// document.querySelector('.active').classList.remove('active');
		// e.target.closest('.nav-link').classList.add('active');
	}


	render() {
		return (
			<nav className="nav flex-column d-sm-block" id="left-nav">

				<h5 className="nav-heading">User content</h5>
				<hr />

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="fas fa-columns"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Dashboard</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/posts" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="far fa-comment-alt"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Posts</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/diets" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="fas fa-utensils"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Diets</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/recipes" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="far fa-list-alt"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Recipes</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/trainings" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="fas fa-heartbeat"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Trainings</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<h5 className="nav-heading">Know your body</h5>
				<hr />

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="fas fa-heartbeat"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Trainings</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<NavLink className="nav-link pt-3 pb-3" exact activeClassName="active" to="/" onClick={this.addActive}>
					<div className="row">
						<div className="col-2 nav-item">
							<i className="fas fa-heartbeat"></i>
						</div>
						<div className="col-7 nav-item pl-0">
							<span>Trainings</span>
						</div>
						<div className="col-2 nav-item">
							<i className="fas fa-arrow-right d-none d-md-block"></i>
						</div>
					</div>
				</NavLink>

				<h5 className="nav-heading">About project</h5>
				<hr />

				<div className="nav-footer">
					<p>2018 BeatCalories &copy; Mateusz Skibicki </p>
					<p>Icons made by Freepik from <a href="https://www.flaticon.com" target="_blank">www.flaticon.com</a></p>
				</div>


			</nav>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(leftSide);
