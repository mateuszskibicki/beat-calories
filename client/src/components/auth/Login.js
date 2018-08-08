import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';

import InputForm from '../common/InputForm';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
			
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	 onChange(e) {
	 	this.setState({ [e.target.name]: e.target.value });
	 }

	 componentClicked = () => {
		 //console.log('clicked');
	 }

	 responseFacebook = (response) => {
		 let userInfo = {
	 		id: response.userID,
	 		email: response.email,
	 		name: response.name,
	 		avatar: `https://graph.facebook.com/v3.0/${response.userID}/picture?type=large`
		 };
		 this.props.registerUserWithFacebook(userInfo);
	 }

	 render() {
	 	const { errors } = this.state;


	 	return (
	 		<div className="login-bg">
	 			<div className="login-page mb-5">
	 				<div className="form fade-in-left">
	 					<form className="login-form" onSubmit={this.onSubmit} autoComplete="off">
							 <h4 className="display-3">Login</h4>
							 <p className="lead">Beat Calories | Mateusz Skibicki</p>
	 						<p className="lead">* - required</p>
							 <hr />

	 						<InputForm
	 							type="email"
	 							placeholder="Email *"
	 							name = "email"
	 							value = {this.state.email}
	 							onChange = {this.onChange}
	 							error = {errors.email}
	 							icon = {<i class="fab fa-facebook-square"></i>}
	 						/>
	 						<InputForm
	 							type="password"
	 							placeholder="Password *"
	 							name = "password"
	 							value = {this.state.password}
	 							onChange = {this.onChange}
	 							error = {errors.password}
	 						/>
	 						{!_.isEmpty(errors) ? (
	 							<div className="alert alert-danger" role="alert">
									Something went wrong, check your details.
	 							</div>
	 						) : null}
	 						<button className="button-green">login</button>
	 						<p className="message">Not registered? <Link to="/register">Create an account</Link></p>
	 					</form>
	 				</div>
	 			</div>
	 		</div>
	 	);

	 }
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);