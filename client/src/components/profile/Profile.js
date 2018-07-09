import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileByHandle} from '../../actions/profileActions';
import moment from 'moment';
import _ from 'lodash';


class Profile extends Component {

	componentDidMount() {
		this.props.getProfileByHandle(this.props.match.params.nickname);
	}

	render() {

		const {profile, loading} = this.props.profile;
		let profileContent;
		
		if (_.isEmpty(profile) || loading) {
			profileContent = (<h1 className="text-center display-1">Loading...</h1>);
		} else {
			console.log(profile);

			//if this is user's account - info about gravatar
			let gravatarInfo;
			{profile._id.toString() === this.props.auth.user.id.toString() ? gravatarInfo = (
				<div>
					<small className="d-block text-muted mt-3">Would you like to change your profile photo?</small>
					<small className="d-block text-muted">Your account is registed with email <strong>{profile.email}</strong></small>
					<small className="d-block text-muted">Change your global avatar here: <a href="https://en.gravatar.com/" target="_blank" className="small-link">GRAVATAR</a></small>
				</div>
			) : gravatarInfo = '';}

			let socialIcons = {
				facebook: false,
				instagram: false,
				twitter: false,
				linkedin: false,
				website: false
			};

			!_.isEmpty(profile.social.facebook) ? socialIcons.facebook = true : null;
			!_.isEmpty(profile.social.instagram) ? socialIcons.instagram = true : null;
			!_.isEmpty(profile.social.twitter) ? socialIcons.twitter = true : null;
			!_.isEmpty(profile.social.linkedin) ? socialIcons.linkedin = true : null;
			!_.isEmpty(profile.social.website) ? socialIcons.website = true : null;

			let socialIconsContent = (
				<div className="mt-3 social-icons">
					{socialIcons.facebook ? <a href={profile.social.facebook}><i className="fab fa-facebook-square"></i></a> : null}
					{socialIcons.instagram ? <a href={profile.social.instagram}><i className="fab fa-instagram"></i></a> : null}
					{socialIcons.twitter ? <a href={profile.social.twitter}><i className="fab fa-twitter-square"></i></a> : null}
					{socialIcons.linkedin ? <a href={profile.social.linkedin}><i className="fab fa-linkedin"></i></a> : null}
					{socialIcons.website ? <a href={profile.social.website}><i className="fas fa-paperclip"></i></a> : null}
				</div>
			);

			// <i className="fab fa-facebook-square mr-2 fa-lg"></i>
			// <i className="fab fa-instagram mr-2 fa-lg"></i>
			// <i className="fab fa-twitter-square mr-2 fa-lg"></i>
			// <i className="fab fa-linkedin mr-2 fa-lg"></i>
			// <i className="fas fa-paperclip mr-2 fa-lg"></i>
			// <i className="fas fa-user-circle mr-2 fa-lg"></i>

			profileContent = (
				<div className="row">
					<div className="col-12 col-md-6 text-center">
						<img src={profile.avatar} className="profile-img img-fluid rounded-circle" alt={`${profile.name} avatar`}/>
						{gravatarInfo}
						{socialIconsContent}
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
					<div className="col-12 text-center mt-3 text-muted">
						<h1>About user:</h1>
						<h4>{profile.bio}</h4>
					</div>
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
