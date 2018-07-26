import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfileByHandle} from '../../actions/profileActions';
import _ from 'lodash';

import Loading from '../common/Loading';
import ProfileContent from './ProfileContent';


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
			profileContent = (<ProfileContent profile={profile}/>);
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
