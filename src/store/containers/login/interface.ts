import { ILoginFormComponent } from '../../../containers/Users/Login/interface';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../types';
import { Action } from 'redux';

export interface ILoginStoreState {
	loading: boolean;
	success: boolean;
	successMsg: string;
	errMessage: string;
}

interface IActionLoginRequest extends Action {
	type: typeof LOGIN_REQUEST;
	payload: ILoginFormComponent;
}

interface IActionLoginSuccess extends Action {
	type: typeof LOGIN_SUCCESS;
	message: string;
}

interface IActionLoginFailure extends Action {
	type: typeof LOGIN_FAILURE;
	errMessage: string;
}

export type ILoginActionTypes =
	| IActionLoginRequest
	| IActionLoginSuccess
	| IActionLoginFailure;
