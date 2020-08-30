import {
	TOKEN_CHECK_REQUEST,
	TOKEN_CHECK_SUCCESS,
	TOKEN_CHECK_FAILURE,
	SAVE_USER_INFO,
	USER_LOGOUT,
} from '../../types';
import { Action } from 'redux';

export interface IUserInfo {
	_id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	token: string;
	isAccountVerified?: any;
}

export interface IUserStoreState {
	loading: boolean;
	success: boolean;
	isAuthenticated: boolean;
	userInfo: IUserInfo;
}

interface IActionAuthReq extends Action {
	type: typeof TOKEN_CHECK_REQUEST;
}

interface IActionAuthSuccess extends Action {
	type: typeof TOKEN_CHECK_SUCCESS;
	payload: IUserStoreState;
}

interface IActionAuthFailure extends Action {
	type: typeof TOKEN_CHECK_FAILURE;
}

interface IActionSaveUserInfo extends Action {
	type: typeof SAVE_USER_INFO;
	payload: IUserStoreState;
}

interface IActionUserLogout extends Action {
	type: typeof USER_LOGOUT;
}

export type IUserActionTypes =
	| IActionAuthReq
	| IActionAuthSuccess
	| IActionAuthFailure
	| IActionSaveUserInfo
	| IActionUserLogout;
