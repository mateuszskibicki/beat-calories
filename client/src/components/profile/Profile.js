import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Profile extends Component {

	render() {
		const { user } = this.props.auth;
		console.log(this.props.match.params.nickname);

		return (
			<div id="posts">
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">
							<p className="display-4">Section profile in progress, come back later <strong>{user.nickname}</strong>. Thank you.</p>
							<div className="col-8">
								<div className="custom-file">
									<input type="file" className="custom-file-input" id="customFile" />
									<label className="custom-file-label" htmlFor="customFile">Choose file</label>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(Profile);
