import * as actions from '../../types';
import { ISignupStoreState, ISignupActionTypes } from './interface';

const initialState: ISignupStoreState = {
	loading: false,
	success: false,
	successMsg: '',
	errMessage: '',
};

const signupReducer = (
	state: ISignupStoreState = initialState,
	action: ISignupActionTypes
) => {
	switch (action.type) {
		case actions.SIGNUP_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				successMsg: action.message,
			};

		case actions.SIGNUP_FAILURE:
			return {
				...state,
				loading: false,
				success: false,
				errMessage: action.errMessage,
			};

		default:
			return state;
	}
};

export default signupReducer;
