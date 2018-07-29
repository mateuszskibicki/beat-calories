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

	onChange = (e) => {
		e.preventDefault();
	}

	render() {

		return (
			<div id="recipes">
				<div className="mt-5 mb-5 fade-in-left">

					<div className="container">
						<div className="row">
						 {
							 //only now xl-12
						 }
							<div className="col-12 col-xl-12">
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
