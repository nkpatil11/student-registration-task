import { ISignupFormComponent } from '../../../containers/Users/Signup/interface';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../../types';
import { Action } from 'redux';

export interface ISignupStoreState {
	loading: boolean;
	success: boolean;
	successMsg: string;
	errMessage: string;
}

interface IActionSignupRequest extends Action {
	type: typeof SIGNUP_REQUEST;
	payload: ISignupFormComponent;
}

interface IActionSignupSuccess extends Action {
	type: typeof SIGNUP_SUCCESS;
	message: string;
}

interface IActionSignupFailure extends Action {
	type: typeof SIGNUP_FAILURE;
	errMessage: string;
}

export type ISignupActionTypes =
	| IActionSignupRequest
	| IActionSignupSuccess
	| IActionSignupFailure;
