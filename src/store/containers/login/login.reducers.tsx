import * as actions from '../../types';
import { ILoginStoreState, ILoginActionTypes } from './interface';

const initialState: ILoginStoreState = {
	loading: false,
	success: false,
	successMsg: '',
	errMessage: '',
};

const loginReducer = (
	state: ILoginStoreState = initialState,
	action: ILoginActionTypes
) => {
	switch (action.type) {
		case actions.LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actions.LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				successMsg: action.message,
			};

		case actions.LOGIN_FAILURE:
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

export default loginReducer;
