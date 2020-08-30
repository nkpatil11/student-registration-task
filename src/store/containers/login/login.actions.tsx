import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ILoginFormComponent } from '../../../containers/Users/Login/interface';
import * as actions from '../../types';
import { logger } from '../../../settings/helpers/Common';
import { ApiHelper } from '../../../settings/helpers/ApiHelper';
import { IUserInfo } from '../user/interface';
import * as constants from '../../../settings/helpers/constants';

export const userLogin = (
	payload: ILoginFormComponent
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
	return async (
		dispatch: ThunkDispatch<any, any, AnyAction>
	): Promise<void> => {
		dispatch(onLoginRequest());

		try {
			const result: any = await new ApiHelper().FetchFromServer(
				'/users',
				'/login',
				'POST',
				false,
				undefined,
				payload
			);

			if (result.isError) {
				throw new Error(result.messages);
			}

			const { data } = result;
			if (data.statusCode === 200 && data.success) {
				dispatch(onLoginSuccess('Login successful'));
				dispatch(
					saveUserInfo({
						isAuthenticated: true,
						userInfo: { ...data.data, token: data.token },
					})
				);

				localStorage.setItem(constants.id, data.token);
			}
		} catch (error) {
			dispatch(onLoginFailure(error));
			logger(error);
		}
	};
};

const onLoginRequest = () => {
	return {
		type: actions.LOGIN_REQUEST,
	};
};

const onLoginSuccess = (message: string) => {
	return {
		type: actions.LOGIN_SUCCESS,
		message,
	};
};

const saveUserInfo = (data: {
	isAuthenticated: boolean;
	userInfo: IUserInfo;
}) => {
	return {
		type: actions.SAVE_USER_INFO,
		payload: data,
	};
};

const onLoginFailure = (error: Error) => {
	return {
		type: actions.LOGIN_FAILURE,
		errMessage: error.message,
	};
};
