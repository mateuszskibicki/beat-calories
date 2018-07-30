import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';
import SelectForm from '../common/SelectForm';
import {Link} from 'react-router-dom';
import {addRecipe} from '../../actions/recipeActions';
import _ from 'lodash';

class RecipeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			kcal: '',
			dishType: '',
			cookingMethod: '',
			cuisine: '',
			lifestyle: '',
			preparationTime: '',
			cookingTime: '',
			price: '',
			shortDescription: '',
			longDescription: '',
			tags: '',
			ingredients: '',
			errors: {}
		};
	}


	componentWillReceiveProps(newProps) {
		if(!_.isEmpty(newProps.errors)) {
			this.setState({errors: newProps.errors});
		} else {
			this.setState({
				title: '',
				kcal: '',
				dishType: '',
				cookingMethod: '',
				cuisine: '',
				lifestyle: '',
				preparationTime: '',
				cookingTime: '',
				price: '',
				shortDescription: '',
				longDescription: '',
				tags: '',
				ingredients: '',
				errors: {}
			});
			document.querySelector('form .button-red').click();
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addRecipe(this.state);
	}


	render() {

		const {errors} = this.state;

		return (
			<div className="col-12 pl-0 pr-0">
				<form className="form" onSubmit={this.onSubmit} autoComplete="off">
					<h4 className="display-4">Add recipe</h4>

					<InputForm
						type="text"
						placeholder="Title *"
						name = "title"
						value = {this.state.title}
						onChange = {this.onChange}
						error = {errors.title}
					/>
          
					<SelectForm
						htmlForAndID='kcal'
						label="Calories *"
						name="kcal"
						optionArray={['0-300', '300-600', '600-1000', '1000+']}
						value = {this.state.kcal}
						onChange = {this.onChange}
						error = {errors.kcal}
					/>

					<SelectForm
						htmlForAndID='dishType'
						label="Dish type *"
						name="dishType"
						optionArray={[
							'Pasta & risotto', 
							'Salad', 
							'Bread & doughs', 
							'Curry',
							'Vegetable sides',
							'Soup',
							'Antipasti',
							'Roast',
							'BBQ food',
							'Stew',
							'Pizza',
							'Sandwiches & wraps',
							'Cakes & tea time treats',
							'Pies & pastries',
							'Sauces & condiments',
							'Puddings & desserts',
							'Drinks',
							'Cookies',
							'Meatballs',
							'Other'
						]}
						value = {this.state.dishType}
						onChange = {this.onChange}
						error = {errors.dishType}
					/>
          
					<SelectForm
						htmlForAndID='cookingMethod'
						label="Cooking method *"
						name="cookingMethod"
						optionArray={[
							'Baking',
							'Boiling',
							'Steaming',
							'Broiling',
							'Frying',
							'Grilling',
							'Roasting',
							'Pickling',
							'Raw',
							'Other'
						]}
						value = {this.state.cookingMethod}
						onChange = {this.onChange}
						error = {errors.cookingMethod}
					/>

					<SelectForm
						htmlForAndID='cuisine'
						label="Cuisine *"
						name="cuisine"
						optionArray={[
							'American',
							'British',
							'Caribbean',
							'Chinese',
							'French',
							'Greek',
							'Indian',
							'Italy',
							'Japanese',
							'Mediterranean',
							'Mexican',
							'Spanish',
							'Thai',
							'Turkish',
							'Vietnamese',
							'Other'
						]}
						value = {this.state.cuisine}
						onChange = {this.onChange}
						error = {errors.cuisine}
					/>

					<SelectForm
						htmlForAndID='lifestyle'
						label="Lifestyle (food) *"
						name="lifestyle"
						optionArray={[
							'Meat',
							'Vegetarian',
							'Vegan'
						]}
						value = {this.state.lifestyle}
						onChange = {this.onChange}
						error = {errors.lifestyle}
					/>

					<SelectForm
						htmlForAndID='preparationTime'
						label="Preparation time *"
						name="preparationTime"
						optionArray={[
							'0-10 min',
							'10-30 min',
							'30-60 min',
							'60-120 min',
							'120+ min'
						]}
						value = {this.state.preparationTime}
						onChange = {this.onChange}
						error = {errors.preparationTime}
					/>

					<SelectForm
						htmlForAndID='cookingTime'
						label="Cooking time *"
						name="cookingTime"
						optionArray={[
							'0-10 min',
							'10-30 min',
							'30-60 min',
							'60-120 min',
							'120+ min'
						]}
						value = {this.state.cookingTime}
						onChange = {this.onChange}
						error = {errors.cookingTime}
					/>

					<SelectForm
						htmlForAndID='price'
						label="Price *"
						name="price"
						optionArray={[
							'Cheap $',
							'Average $$',
							'Expensive $$$'
						]}
						value = {this.state.price}
						onChange = {this.onChange}
						error = {errors.price}
					/>

					<button 
						className="button-blue mb-2" 
						onClick={this.formatButton}
						type="button" 
						data-toggle="collapse" 
						data-target="#dietFormatCollapse" 
						aria-expanded="false" 
						aria-controls="dietFormatCollapse"
					>
						Recommended format
					</button>

					<div className="collapse mt-2 mb-2" id="dietFormatCollapse">
						<p className="lead p-0 m-0">
							<strong>Title:</strong> short title giving the main points of your diet
							<br />
							<br />
							<strong>Calories:</strong> how many calories do you have in your diet, 
							you can calculate this online, for example here   
							<a 
								href="https://caloriecontrol.org/healthy-weight-tool-kit/food-calorie-calculator/" 
								target="_blank"
								className="ml-2"
							>
								CalorieControl
							</a>
							<br/>
							<br/>
							<strong>Type of diet:</strong> is this meat, vegetarian or vegan diet?
							<br/>
							<br/>
							<strong>Description:</strong> between 50 and 5000 characters, this is always nice if you leave details about proteins, fats and carbohydrates, meal hours and food replacements. Short example: 
							<br/>
							<br/>
							This is 2000 kcal diet.
							<br/>
							<strong>6-7am breakfast :</strong>  two slices of whole-grain toast, 1 tablespoon of peanut butter, four egg whites, one small orange and 1 cup of low-fat Greek yogurt.
							<br/>
							<strong>9am snack :</strong> 1.5 ounces of reduced-fat cheese and 1 cup of blueberries
							<br/>
							<strong>12pm lunch :</strong>  2.5 ounces of grilled chicken breast, 1 cup of brown rice and 1.25 cups of cooked broccoli
							<br/>
							<strong>3pm snack :</strong> two-thirds of an ounce of sunflower seeds and 2 cups of low-fat cottage cheese
							<br/>
							<strong>6pm dinner :</strong> 2.5 ounces of cooked lean beef; 1.25 cups of sautéed mushrooms, onions and peppers, 2 teaspoons of olive oil, and 1 cup of whole-wheat pasta.
							Diet found on : <a href="https://www.livestrong.com/article/121518-calorie-diets-men/" target="_blank" className="ml-2">Livestrong</a>
							<br/>
							<br/>
							<strong>Tags:</strong> type couple of comma separated tags giving the main points of your diet

						</p>
					</div>

					<TextAreaForm 
						type="text"
						placeholder="Short description 10-200 characters *"
						name = "shortDescription"
						value = {this.state.shortDescription}
						onChange = {this.onChange}
						error = {errors.shortDescription}
					/>

					<TextAreaForm 
						type="text"
						placeholder="Full (long) description 50-3000 characters *"
						name = "longDescription"
						value = {this.state.longDescription}
						onChange = {this.onChange}
						error = {errors.longDescription}
					/>

					<InputForm
						type="text"
						placeholder="Tags : comma separated ','"
						name = "tags"
						value = {this.state.tags}
						onChange = {this.onChange}
						error = {errors.tags}
					/>

					<InputForm
						type="text"
						placeholder="Ingredients : comma separated ','"
						name = "ingredients"
						value = {this.state.ingredients}
						onChange = {this.onChange}
						error = {errors.ingredients}
					/>
				
					{!_.isEmpty(errors) ? (
						<div className="alert alert-danger" role="alert">
						Something went wrong, check your data.
						</div>
					) : null}
					<button className="button-green">ADD RECIPE</button>
					<button className="button-red" type="button" data-dismiss="modal" aria-label="Close">
						Cancel
					</button>
				</form>
			</div>
		);
	}
}

RecipeForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	recipe: PropTypes.object.isRequired,
	addRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	recipe: state.recipe,
	errors: state.errors
});



export default connect(mapStateToProps, {addRecipe})(RecipeForm);
