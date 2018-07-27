import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProfileFormUpdate from './ProfileFormUpdate';
import DietCard from '../diets/DietCard';

import SocialIcons from './SocialIcons';
import moment from 'moment';
import _ from 'lodash';

class ProfileContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			showFormUpdate: false
		};
	}
  
  changeVisibility = (e) => {
  	e.preventDefault();
  	this.setState({showFormUpdate: !this.state.showFormUpdate});
  }

  render() {
  	const { profile } = this.props;
  	console.log(profile);
  	let profileContent;

  	//if this is user's account - info about gravatar
  	let updateInfo;
  	{profile._id.toString() === this.props.auth.user.id.toString() ? updateInfo = (
  		<div className="mt-3">

  			<div className="profile-update-button" onClick={this.changeVisibility}>
  				<i className="fas fa-pencil-alt"></i>
  			</div>
      

  			{this.state.showFormUpdate ? <ProfileFormUpdate /> : null}
        
  			<small className="d-block text-muted">REMEMBER, after update you'll be redirected to login page.</small>
  			<small className="d-block text-muted">Would you like to change your profile photo?</small>
  			<small className="d-block text-muted">Your account is registed with email <strong>{profile.email}</strong></small>
  			<small className="d-block text-muted">Change your global avatar here: <a href="https://en.gravatar.com/" target="_blank" className="small-link">GRAVATAR</a></small>
  		</div>
  	) : updateInfo = '';}
    
  	let dietContent;
  	!_.isEmpty(profile.diets) ? dietContent = profile.diets.map(diet => <DietCard key={diet._id} diet={diet}/>) : null;

  	let likedDietsContent;
  	!_.isEmpty(profile.likedDiets) ? likedDietsContent = profile.likedDiets.map(diet => <DietCard key={diet._id} diet={diet}/>) : null;

  	profileContent = (
  		<div className="row fade-in-left">
  			<div className="col-12 col-md-6 text-center">
  				<img src={profile.avatar} className="profile-img img-fluid rounded-circle" alt={`${profile.name} avatar`}/>
  				{updateInfo}
  				<SocialIcons  socialIcons={profile.social}/>
  			</div>
  			<div className="col-12 col-md-6 text-center mt-3 text-muted">
  				<small className="lead">Full name: </small>
  				<h4>{profile.name}</h4>
  				<small className="lead">Nickname: </small>
  				<h4>{profile.nickname}</h4>
  				<small className="lead">Joined: </small>
  				<h4>{moment(profile.date).format('MMMM Do YYYY')}</h4>
  				<small className="lead">Diets: </small>
  				<h4>{profile.numberOfDiets}</h4>
  				<small className="lead">Posts: </small>
  				<h4>{profile.numberOfPosts}</h4>
  				<small className="lead">Recipes: </small>
  				<h4>{profile.numberOfRecipes}</h4>
  				<small className="lead">Trainings: </small>
  				<h4>{profile.numberOfPosts}</h4>
  			</div>

  			{!_.isEmpty(profile.bio) ? (
  				<div className="col-12 text-center mt-3 text-muted">
  					<h2>About:</h2>
  					<p className="lead text-space">{profile.bio}</p>
  				</div>
  			) : null}
        
  			{!_.isEmpty(profile.diets) ? (
  				<div className="col-12 text-center mt-5 text-muted">
  					<h2>Diets: {profile.diets.length}</h2>
  					<div className="row mt-3">
  						{dietContent}
  					</div>				
  				</div>
  			) : null}
        
  			{!_.isEmpty(profile.likedDiets) && profile._id.toString() === this.props.auth.user.id.toString() ? (
  				<div className="col-12 text-center mt-5 text-muted">
  					<h2>Liked diets: {profile.likedDiets.length}</h2>
  					<div className="row mt-3">
  						{likedDietsContent}
  					</div>				
  				</div>
  			) : null}

  		</div>
  	);
    


  	return (
  		<div>
  			{profileContent}
  		</div>
  	);
  }
}

ProfileContent.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ProfileContent);
