import { ILoginStoreState } from '../../../store/containers/login/interface';
import { IUserStoreState } from '../../../store/containers/user/interface';

export interface ILoginProps {
	loginProps: ILoginStoreState;
	userProps: IUserStoreState;
	signinShow: boolean;
	handleClose: any;
	signupShow: any;
	userLogin: (payload: ILoginFormComponent) => Promise<void>;
	validateToken: () => Promise<void>;
}
export interface ILoginStates {
	loader?: boolean;
}

export interface ILoginFormComponent {
	email: string;
	password: string;
}

export interface ILoginFormComponentViewProps {
	signupShow: any;
	loader: any;
}

export interface IDispatchToProps {
	userLogin: (payload: ILoginFormComponent) => Promise<void>;
	validateToken: () => Promise<void>;
}
