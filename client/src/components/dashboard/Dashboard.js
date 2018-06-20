import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RightSideHeader from '../common/RightSideHeader';
import DashboardContent from './DashboardContent';


class Dashboard extends Component {
	// componentDidMount() {
	// 	this.props.getCurrentProfile();
	// }

	// onDeleteClick(e) {
	// 	this.props.deleteAccount();
	// }

	render() {
		const { user } = this.props.auth;
		// const { profile, loading } = this.props.profile;

		// let dashboardContent;

		// if (profile === null || loading) {
		// 	dashboardContent = <Spinner />;
		// } else {
		// 	// Check if logged in user has profile data
		// 	if (Object.keys(profile).length > 0) {
		// 		dashboardContent = (
		// 			<div>
		// 				<p className="lead text-muted">
		//           Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
		// 				</p>
		// 				<ProfileActions />
		// 				<Experience experience={profile.experience} />
		// 				<Education education={profile.education} />

		// 				<div className="mb-5">
		// 					<button
		// 						onClick={this.onDeleteClick.bind(this)}
		// 						className="btn btn-danger"
		// 					>
		//             Delete my account
		// 					</button>
		// 				</div>
		// 			</div>
		// 		);
		// 	} else {
		// 		// User is logged in but has no profile
		// 		dashboardContent = (
		// 			<div>
		// 				<p className="lead text-muted">Welcome {user.name}</p>
		// 				<p>You have not yet setup a profile, please add some info</p>
		// 				<Link to="/create-profile" className="btn btn-lg btn-info">
		//           Create Profile
		// 				</Link>
		// 			</div>
		// 		);
		// 	}
		// }

		return (
			<div id="right-panel" className="right-panel">
				<RightSideHeader />
				<DashboardContent />
				<p className="display-3">{user.name}</p>
			</div>
		);
	}
}

// Dashboard.propTypes = {
// 	getCurrentProfile: PropTypes.func.isRequired,
// 	deleteAccount: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// 	profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
