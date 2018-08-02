import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class About extends Component {

	render() {
		const { user } = this.props.auth;

		return (
			<div className="mt-5 fade-in-left">
				<div className="container text-center text-muted">
					<h1>Hi {this.props.auth.user.nickname}!</h1>
					<h2>This is Beat Calories project, created by Mateusz Skibicki.</h2>
					<small>Based on MERN Full Stack : MongoDB (mongoose) / Express.js / React & Redux / Node.js</small>
					<h5>Feel free to create diets, recipes, training, posts and leave comments/likes.</h5>
					<div className='alert alert-danger'>Trainings and posts pages aren't complete at this moment.</div>
					<h5>Small devices: navbar button on top | Medium and big devices: navbar fixed on left side.</h5>
					<h5>Your profile page : click your on avatar photo (right/top) and 'My profile' button.</h5>
				</div>
			</div>
		);
	}
}

About.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(About);
