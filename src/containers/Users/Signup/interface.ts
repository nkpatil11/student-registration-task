import { ISignupStoreState } from '../../../store/containers/signup/interface';
import { IUserStoreState } from '../../../store/containers/user/interface';

export interface ISignupProps {
	signupProps: ISignupStoreState;
	userProps: IUserStoreState;
	signupShow: boolean;
	handleClose: any;
	signinShow: any;
	userSignup: (payload: ISignupFormComponent) => Promise<void>;
}
export interface ISignupStates {}

export interface IAddBusinessTypeSelect {
	_id: string;
	name: string;
}

export interface ISignupFormComponent {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ISignupFormComponentViewProps {
	signinShow: any;
}

export interface IDispatchToProps {
	userSignup: (payload: ISignupFormComponent) => Promise<void>;
}
