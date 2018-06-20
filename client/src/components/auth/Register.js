import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			facebook: '',
			instagram: '',
			twitter: '',
			linkedin: '',
			website: '',
			bio: '',
			errors: {}
		};

	// 	this.onChange = this.onChange.bind(this);
	// 	this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			nickname: this.state.nickname,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="container-fluid">
				<div className="sufee-login d-flex align-content-center flex-wrap">
					<div className="container">
						<div className="login-content">
							<div className="login-form">
								<h1 className="display-4 text-center mb-4">Register</h1>
								<p className="display-6 text-muted">* - required</p>
								<form onSubmit={this.onSubmit}>
									<InputForm
										label = "		USER NAME *"
										type = "text"
										placeholder = "Full Name"
										name = "name"
										value = {this.state.name}
										onChange = {this.onChange}
										error = {errors.name}
										icon = {<i className="fa fa-user-circle" aria-hidden="true"></i>}
									/>
									<InputForm
										label = "NICKNAME *"
										type = "text"
										placeholder = "Your nickname"
										name = "nickname"
										value = {this.state.nickname}
										onChange = {this.onChange}
										error = {errors.nickname}
									/>
									<InputForm
										label = "EMAIL ADDRESS *"
										type = "email"
										placeholder = "Email"
										name = "email"
										value = {this.state.email}
										onChange = {this.onChange}
										error = {errors.email}
									/>
									<InputForm
										label = "PASSWORD *"
										type = "password"
										placeholder = "Password"
										name = "password"
										value = {this.state.password}
										onChange = {this.onChange}
										error = {errors.password}
									/>
									<InputForm
										label = "CONFIRM PASSWORD *"
										type = "password"
										placeholder = "Confirm Password"
										name = "password2"
										value = {this.state.password2}
										onChange = {this.onChange}
										error = {errors.password2}	
									/>
									<InputForm
										label = "		FACEBOOK"
										type = "text"
										placeholder = "Link to your Facebook account"
										name = "facebook"
										value = {this.state.facebook}
										onChange = {this.onChange}
										error = {errors.facebook}
										icon = {<i className="fa fa-facebook-official" aria-hidden="true"></i>}
									/>
									<InputForm
										label = "		INSTAGRAM"
										type = "text"
										placeholder = "Link to your Instagram account"
										name = "instagram"
										value = {this.state.instagram}
										onChange = {this.onChange}
										error = {errors.instagram}
										icon = {<i className="fa fa-instagram" aria-hidden="true"></i>}
									/>
									<InputForm
										label = "		TWITTER"
										type = "text"
										placeholder = "Link to your Twitter account"
										name = "twitter"
										value = {this.state.twitter}
										onChange = {this.onChange}
										error = {errors.twitter}
										icon = {<i className="fa fa-twitter-square" aria-hidden="true"></i>}
									/>
									<InputForm
										label = "		LINKEDIN"
										type = "text"
										placeholder = "Link to your LinkedIn account"
										name = "linkedin"
										value = {this.state.linkedin}
										onChange = {this.onChange}
										error = {errors.linkedin}
										icon = {<i className="fa fa-linkedin-square" aria-hidden="true"></i>}
									/>
									<InputForm
										label = "		DO YOU HAVE WEBSITE?"
										type = "text"
										placeholder = "Link to your website"
										name = "website"
										value = {this.state.website}
										onChange = {this.onChange}
										error = {errors.website}
										icon = {<i className="fa fa-external-link" aria-hidden="true"></i>}
									/>
									<TextAreaForm
										label = "		SAY SOMETHING ABOUT YOU"
										type = "text"
										placeholder = "Short bio"
										name = "bio"
										value = {this.state.bio}
										onChange = {this.onChange}
										error = {errors.bio}
										icon = {<i className="fas fa-user-alt"></i>}
									/>
									
									<button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Register</button>
									<div className="register-link m-t-15 text-center">
										<p>Already have account ? <Link to="/login"> Sign in</Link></p>
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

// Register.propTypes = {
// 	registerUser: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// 	errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps ,{registerUser})(withRouter(Register));
