import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ISignupFormComponent } from '../../../containers/Users/Signup/interface';
import * as actions from '../../types';
import { ApiHelper } from '../../../settings/helpers/ApiHelper';
import { logger } from '../../../settings/helpers/Common';

export const userSignup = (
	payload: ISignupFormComponent
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
	return async (
		dispatch: ThunkDispatch<any, any, AnyAction>
	): Promise<void> => {
		dispatch(onSignupRequest());

		try {
			const result: any = await new ApiHelper().FetchFromServer(
				'/users',
				'/signup',
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
				dispatch(
					onSignupSuccess(((data || {}).data || []).message || data.message)
				);
			}
		} catch (error) {
			dispatch(onSignupFailure(error));
			logger(error);
		}
	};
};

const onSignupRequest = () => {
	return {
		type: actions.SIGNUP_REQUEST,
	};
};

const onSignupSuccess = (message: string) => {
	return {
		type: actions.SIGNUP_SUCCESS,
		message,
	};
};

const onSignupFailure = (error: Error) => {
	return {
		type: actions.SIGNUP_FAILURE,
		errMessage: error.message,
	};
};
