import React, { Component } from 'react';
import {connect} from 'react-redux';
import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';
import SelectForm from '../common/SelectForm';
import {Link} from 'react-router-dom';
import {addDiet} from '../../actions/dietActions';
import _ from 'lodash';

class DietForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			kcal: '',
			type: '',
			description: '',
			tags: '',
			errors: {}
		};
	}


	componentWillReceiveProps(newProps) {
		//console.log(newProps);
		if(!_.isEmpty(newProps.errors)) {
			this.setState({errors: newProps.errors});	
		} else {
			this.setState({
				title: '',
				kcal: '',
				type: '',
				description: '',
				tags: '',
				errors: {}
			});
			document.querySelector('.button-red').click();
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addDiet(this.state);
	}


	render() {

		const {errors} = this.state;

		return (
			<div className="col-12">
				<form className="form" onSubmit={this.onSubmit} autoComplete="off">
					<h4 className="display-4">Add diet</h4>
					<InputForm
						type="text"
						placeholder="Title *"
						name = "title"
						value = {this.state.title}
						onChange = {this.onChange}
						error = {errors.title}
					/>
					<InputForm
						type="text"
						placeholder="Calories *"
						name = "kcal"
						value = {this.state.kcal}
						onChange = {this.onChange}
						error = {errors.kcal}
					/>

					<SelectForm
						htmlForAndID='typeOfDiet'
						label="Type of diet"
						name="type"
						optionArray={['Meat', 'Vegetarian', 'Vegan']}
						value = {this.state.type}
						onChange = {this.onChange}
						error = {errors.type}
					/>

					<TextAreaForm 
						type="text"
						placeholder="Description 50-2000 characters *"
						name = "description"
						value = {this.state.description}
						onChange = {this.onChange}
						error = {errors.description}
					/>

					<InputForm
						type="text"
						placeholder="Tags : comma separated ','"
						name = "tags"
						value = {this.state.tags}
						onChange = {this.onChange}
						error = {errors.tags}
					/>
				
					{!_.isEmpty(errors) ? (
						<div className="alert alert-danger" role="alert">
						Something went wrong, check your data.
						</div>
					) : null}
					<button className="button-green">ADD DIET</button>
					<button className="button-red" type="button" data-dismiss="modal" aria-label="Close">
						Cancel
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	diet: state.diet
});



export default connect(mapStateToProps, {addDiet})(DietForm);
