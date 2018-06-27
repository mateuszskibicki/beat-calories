import {
	GET_DIET,
	GET_DIETS,
	GET_DIET_BY_ID,
	DIET_LOADING
} from '../actions/types';

const initialState = {
	diets: [],
	diet: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
	case DIET_LOADING:
		return {
			...state,
			loading: true
		};
	case GET_DIETS:
		return {
			...state,
			loading: false,
			diets: action.payload	
		};
	case GET_DIET_BY_ID:
		return {
			...state,
			loading: false,
			diet: action.payload	
		};
	default:
		return state;
	}
}
