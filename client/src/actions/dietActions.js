import axios from 'axios';

import {
	GET_DIET,
	GET_DIETS,
	GET_ERRORS,
	CLEAR_ERRORS,
	DIET_LOADING
} from './types';

// Get diets
export const getDiets = () => dispatch => {
	dispatch(dietLoading());
	axios.get('/api/diets')
		.then(res => dispatch({type: GET_DIETS, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Diet loading
export const dietLoading = () => {
	return { type: DIET_LOADING };
};

// Clear errors
export const clearErrors = () => {
	return { type: CLEAR_ERRORS };
};
