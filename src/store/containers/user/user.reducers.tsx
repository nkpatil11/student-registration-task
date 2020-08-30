import * as actions from '../../types';
import { IUserStoreState, IUserActionTypes } from './interface';
import * as constants from '../../../settings/helpers/constants';

const initialState: IUserStoreState = {
	loading: false,
	success: false,
	isAuthenticated:
		localStorage.getItem(constants.id) || sessionStorage.getItem(constants.id)
			? true
			: false,
	userInfo: {
		_id: '',
		email: '',
		name: '',
		createdAt: '',
		updatedAt: '',
		token: '',
	},
};

const userReducer = (
	state: IUserStoreState = initialState,
	action: IUserActionTypes
) => {
	switch (action.type) {
		case actions.TOKEN_CHECK_REQUEST:
			return {
				...state,
				loading: true,
				success: false,
				userInfo: {
					_id: '',
					contact: '',
					email: '',
					name: '',
					createdAt: '',
					updatedAt: '',
					token: '',
				},
			};

		case actions.TOKEN_CHECK_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				isAuthenticated: action.payload.isAuthenticated,
				userInfo: { ...action.payload.userInfo },
			};

		case actions.TOKEN_CHECK_FAILURE:
			return {
				...state,
				loading: false,
				success: false,
				isAuthenticated: false,
				userInfo: {
					_id: '',
					email: '',
					name: '',
					createdAt: '',
					updatedAt: '',
					token: '',
				},
			};

		case actions.SAVE_USER_INFO:
			return {
				...state,
				loading: false,
				success: true,
				isAuthenticated: action.payload.isAuthenticated,
				userInfo: { ...action.payload.userInfo },
			};

		case actions.USER_LOGOUT:
			return {
				...state,
				loading: false,
				success: false,
				isAuthenticated: false,
				userInfo: {
					_id: '',
					email: '',
					name: '',
					createdAt: '',
					updatedAt: '',
					token: '',
				},
			};

		default:
			return state;
	}
};

export default userReducer;
