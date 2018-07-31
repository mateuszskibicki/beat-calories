import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getRecipes} from '../../actions/recipeActions';

import _ from 'lodash';
import moment from 'moment';

import Loading from '../common/Loading';
import RecipeForm from './RecipeForm';
import RecipeCard from './RecipeCard';


class Recipes extends Component {

	componentDidMount() {
		window.scrollTo(0,0);
		this.props.getRecipes();
	}

	componentWillReceiveProps(nextProps){
		if(this.props !== nextProps && nextProps.recipe.recipes.length > 0){
			document.getElementById('charts').innerHTML = `
				<div class="row">
					<div class="col-sm-6 text-center">
						<small><strong>BY TYPES</strong></small>
						<canvas id="recipesChart" width="320" height="320"></canvas>
					</div>		  
					<div class="col-sm-6 text-center">
						<small><strong>BY CALORIES</strong></small>
						<canvas id="kcalChart" width="320" height="320"></canvas>
					</div>
				</div>
			`;
			const {recipes} = nextProps.recipe;

			let recipesMeat = 0;
			let recipesVegetarian = 0;
			let recipesVegan = 0;
			let recipes0_300 = 0;
			let recipes300_600 = 0;
			let recipes600_1000 = 0;
			let recipes1000andMore = 0;


			if(_.isEmpty(recipes) && !recipes.length) {
				return null;
			} else {
				recipes.map(recipe => {
					recipe.lifestyle === 'Meat' ? recipesMeat++ : null;
					recipe.lifestyle === 'Vegetarian' ? recipesVegetarian++ : null;
					recipe.lifestyle === 'Vegan' ? recipesVegan++ : null;
					recipe.kcal === '0-300' ? recipes0_300++ : null;
					recipe.kcal === '300-600' ? recipes300_600++ : null;
					recipe.kcal === '600-1000' ? recipes600_1000++ : null;
					recipe.kcal === '1000+' ? recipes1000andMore++ : null;
				});
				// $red-meat: #ff6347;
				// $green-vegan: #89da59;
				// $blue--vegetarian: #11998e;
				var recipesChart = document.getElementById('recipesChart');
				let recipesChartData = {
					datasets: [{
						data: [recipesMeat, recipesVegetarian, recipesVegan],
						backgroundColor: [
							'#ff6347',
							'#11998e',
							'#89da59'
						],
					}],
					labels: [
						'Meat',
						'Vegetarian',
						'Vegan'
					]
				};
				var myDoughnutChart = new Chart(recipesChart, {
					type: 'doughnut',
					data: recipesChartData,
					options: null
				});


				var kcalChart = document.getElementById('kcalChart');
				let kcalChartData = {
					datasets: [{			
						data: [recipes0_300,
							recipes300_600,
							recipes600_1000,
							recipes1000andMore],
						backgroundColor: [
							'rgba(85, 239, 196, 0.8)',
							'rgba(108, 92, 231, 0.8)',
							'rgba(9, 132, 227, 0.8)',
							'rgba(214, 48, 49, 0.8)'
						],
					}],
					labels: [
						'0-300',
						'300-600',
						'600-1000',
						'1000+'
					],				
				};
				var myDoughnutChart2 = new Chart(kcalChart, {
					type: 'doughnut',
					data: kcalChartData,
					options: null
				});
			}
		}
	}

	onChange = (e) => {
		e.preventDefault();
	}

	render() {

		return (
			<div id="recipes">
				<div className="mt-5 mb-5 fade-in-left">

					<div className="container">
						<div className="row">

							<div className="col-12 col-xl-4">
								<div className="add-container add-container-recipe">
									<button type="button" className="button-add-modal" data-toggle="modal" data-target="#dietAddModal">
									ADD RECIPE
										<div className="d-block">
											<i className="far fa-plus-square"></i>
										</div>
									</button>		
								</div>
								<div className="modal fade p-0" id="dietAddModal" tabIndex={-1} role="dialog" aria-labelledby="dietAddModalLabel" aria-hidden="true">
									<div className="modal-dialog modal-lg" role="document">
										<div className="modal-content modal-form">
											<RecipeForm />
										</div>
									</div>
								</div>
							</div>

							<div className="col-12 col-xl-8 mt-5" id="charts">
								{
								//charts go here
								}
							</div>

						</div>
					</div>

					<div className="container">
						<div className="row user-content">
							<div className="col-12 mb-4">
								<div className="row">
									{this.props.recipe.recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe._id}/>)}
								</div>
							</div>
						</div>
					</div>



				</div>
			</div>
		);
	}
}

Recipes.propTypes = {
	auth: PropTypes.object.isRequired,
	recipe: PropTypes.object.isRequired,
	getRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	recipe: state.recipe
});

export default connect(mapStateToProps, {getRecipes})(Recipes);
