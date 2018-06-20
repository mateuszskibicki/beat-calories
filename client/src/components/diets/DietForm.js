import React, { Component } from 'react';
import InputForm from '../common/InputForm';
import {Link} from 'react-router-dom';

class DietForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}


	render() {

		const errors = {};
		return (
			<form className="form form-big" onSubmit={this.onSubmit} autoComplete="off">
				<h4 className="display-4">Add diet</h4>
				<div className="row">
					<div className="col-12 col-md-6 col-xl-4">
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
					</div>

					<div className="col-12 col-md-6 col-xl-4">
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
						<InputForm
							type="password"
							placeholder="Password *"
							name = "password"
							value = {this.state.password}
							onChange = {this.onChange}
							error = {errors.password}
						/>
					</div>


				</div>
				
				{!_.isEmpty(errors) ? (
					<div className="alert alert-danger" role="alert">
						Something went wrong, check your data.
					</div>
				) : null}
				<button>ADD DIET</button>
			</form>
		);
	}
}


export default DietForm;
