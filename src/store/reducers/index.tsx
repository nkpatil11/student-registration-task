import { combineReducers, Reducer, AnyAction } from 'redux';

// ALL INTERFACES
import { ISignupStoreState } from '../containers/signup/interface';
import { ILoginStoreState } from '../containers/login/interface';
import { IUserStoreState } from '../containers/user/interface';

// ALL REDUCERS
import loginReducer from '../containers/login/login.reducers';
import signupReducer from '../containers/signup/signup.reducers';
import userReducer from '../containers/user/user.reducers';

export interface IAppState {
	readonly loginState: ILoginStoreState;
	readonly signupState: ISignupStoreState;
	readonly userState: IUserStoreState;
}

const rootReducer: Reducer<any, AnyAction> = combineReducers<IAppState>({
	signupState: signupReducer,
	loginState: loginReducer,
	userState: userReducer,
});

export default rootReducer;
