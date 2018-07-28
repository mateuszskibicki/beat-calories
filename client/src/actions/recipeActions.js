import axios from 'axios';

import {
	GET_RECIPE_BY_ID,
	GET_RECIPES,
	GET_ERRORS,
	RECIPE_LOADING,
	ADD_RECIPE,
	LIKE_RECIPE,
	CLEAR_ERRORS
} from '../actions/types';

// Get recipes
export const getRecipes = () => dispatch => {
	dispatch(recipeLoading());
	axios.get('/api/recipes')
		.then(res => dispatch({type: GET_RECIPES, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add recipes
export const addRecipe = (recipeData) => dispatch => {
	dispatch(clearErrors());
	axios.post('/api/recipes', recipeData)
		.then(res => dispatch({type: ADD_RECIPE, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};


// Recipe loading
export const recipeLoading = () => {
	return { type: RECIPE_LOADING };
};

// Clear errors
export const clearErrors = () => {
	return { type: CLEAR_ERRORS };
};
