import {
	GET_DIET,
	GET_DIETS,
	DIET_LOADING
} from '../actions/types';

const initialState = {
	diets: [],
	diet: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
	case GET_DIETS:
		return {
			...state,
			loading: false,
			diets: action.payload,	
		};
	case DIET_LOADING:
		return {
			...state,
			loading: true
		};
	default:
		return state;
	}
}
