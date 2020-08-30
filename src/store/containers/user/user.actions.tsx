import * as actions from '../../types';
import { IUserInfo } from './interface';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { logger } from '../../../settings/helpers/Common';
import { ApiHelper } from '../../../settings/helpers/ApiHelper';
import * as constants from '../../../settings/helpers/constants';
import History from '../../../settings/helpers/History';

export const validateToken = (): ThunkAction<
	Promise<void>,
	{},
	{},
	AnyAction
> => {
	return async (
		dispatch: ThunkDispatch<any, any, AnyAction>
	): Promise<void> => {
		dispatch(onAuthRequest());

		try {
			const result: any = await new ApiHelper().FetchFromServer(
				'/users',
				'/validate',
				'POST',
				true,
				undefined,
			);

			if (result.isError) {
				throw new Error(result.messages);
			}

			const { data } = result;
			if (data.statusCode === 200 && data.success) {
				dispatch(
					onAuthSuccess({
						isAuthenticated: true,
						userInfo: {
							...data.data,
							token: localStorage.getItem(constants.id),
						},
					})
				);
				History.replace('/drawer/students');
			}
		} catch (error) {
			localStorage.removeItem('id');
			sessionStorage.clear();
			dispatch(onAuthFailure(error));
			logger(error);
		}
	};
};

const onAuthRequest = () => {
	return {
		type: actions.TOKEN_CHECK_REQUEST,
	};
};

const onAuthSuccess = (payload: {
	isAuthenticated: boolean;
	userInfo: IUserInfo;
}) => {
	return {
		type: actions.TOKEN_CHECK_SUCCESS,
		payload,
	};
};

const onAuthFailure = (error: Error) => {
	return {
		type: actions.TOKEN_CHECK_FAILURE,
		errMessage: error.message,
	};
};

export const saveUserInfo = (payload: {
	isAuthenticated: boolean;
	userInfo: IUserInfo;
}) => {
	return {
		type: actions.SAVE_USER_INFO,
		payload,
	};
};

export const onLogout = () => {
	return {
		type: actions.USER_LOGOUT,
	};
};
