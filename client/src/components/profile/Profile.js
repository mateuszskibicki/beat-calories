import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileByHandle} from '../../actions/profileActions';
import moment from 'moment';
import _ from 'lodash';

import Loading from '../common/Loading';
import SocialIcons from './SocialIcons';


class Profile extends Component {

	componentDidMount() {
		this.props.getProfileByHandle(this.props.match.params.nickname);
		window.scrollTo(0,0);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps && nextProps.match.params.nickname !== this.props.match.params.nickname)
		{
			this.props.getProfileByHandle(nextProps.match.params.nickname);
			window.scrollTo(0,0);
		}
	}

	render() {
		const {profile, loading} = this.props.profile;
		let profileContent;
		
		if (loading) {
			profileContent = <Loading />;

		} else if (_.isEmpty(profile) && !loading && !this.props.errors.success) {
			profileContent = (
				<div>
					<p className="display-4 text-muted">Ups.. something went wrong!</p>
					<p className="lead text-muted">User <strong className="text-dark">{this.props.match.params.nickname}</strong> does not exist or account has been deleted.</p>								
					<Link to='/' className="btn btn-outline-secondary m-0">Go back to dashboard</Link>
				</div>
			);
		} else {
			//console.log(profile);

			//if this is user's account - info about gravatar
			let updateInfo;
			{profile._id.toString() === this.props.auth.user.id.toString() ? updateInfo = (
				<div className="mt-3">
					<div className="profile-update-button mb-1">
						<i className="fas fa-pencil-alt"></i>
					</div>
					<small className="d-block text-muted">Would you like to change your profile photo?</small>
					<small className="d-block text-muted">Your account is registed with email <strong>{profile.email}</strong></small>
					<small className="d-block text-muted">Change your global avatar here: <a href="https://en.gravatar.com/" target="_blank" className="small-link">GRAVATAR</a></small>
				</div>
			) : updateInfo = '';}


			profileContent = (
				<div className="row">
					<div className="col-12 col-md-6 text-center">
						<img src={profile.avatar} className="profile-img img-fluid rounded-circle" alt={`${profile.name} avatar`}/>
						{updateInfo}
						<SocialIcons  socialIcons={profile.social}/>
					</div>
					<div className="col-12 col-md-6 text-center mt-3 text-muted">
						<small className="lead">Full name: </small>
						<h4>{profile.name}</h4>
						<small className="lead">Nickname: </small>
						<h4>{profile.name}</h4>
						<small className="lead">Joined: </small>
						<h4>{moment(profile.date).format('MMMM Do YYYY')}</h4>
						<small className="lead">Diets: </small>
						<h4>{profile.numberOfDiets}</h4>
						<small className="lead">Posts: </small>
						<h4>{profile.numberOfPosts}</h4>
						<small className="lead">Recipes: </small>
						<h4>{profile.numberOfPosts}</h4>
						<small className="lead">Trainings: </small>
						<h4>{profile.numberOfPosts}</h4>
					</div>

					{!_.isEmpty(profile.bio) ? (
						<div className="col-12 text-center mt-3 text-muted">
							<h1>About user:</h1>
							<p className="lead text-space">{profile.bio}</p>
						</div>
					) : null}

				</div>
			);
		}

		return (
			<div id="profile">
				<div className="mt-5">
					<div className="container">
						{profileContent}
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);
