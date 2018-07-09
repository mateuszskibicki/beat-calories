import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Profile extends Component {

	render() {
		const { user } = this.props.auth;

		return (
			<div id="posts">
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">
							<p className="display-4">Section profile in progress, come back later <strong>{user.nickname}</strong>. Thank you.</p>
							<div className="col-8">
								

								<form 
									className="login-form" 
									onSubmit={this.onSubmit} 
									autoComplete="off"
									encType="multipart/form-data"
								>
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<span className="input-group-text">Upload</span>
										</div>
										<div className="custom-file">
											<input 
												type="file" 
												className="custom-file-input" 
												id="profile-image" 
												name="profile-image"
												//onChange={this.onChange}
											/>
											<label 
												className="custom-file-label" 
												htmlFor="profile-image"
											>
												<button className="btn-block mt-5 btn btn-danger">Submit</button>
											Choose file
											</label>
										</div>
									</div>

								</form>


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
