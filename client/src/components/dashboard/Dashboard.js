import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Dashboard extends Component {

	render() {
		const { user } = this.props.auth;

		return (
			<div id="posts">
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">
							<p className="display-4">Section DASHBOARD in progress, come back later <strong>{user.nickname}</strong>. Thank you.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
