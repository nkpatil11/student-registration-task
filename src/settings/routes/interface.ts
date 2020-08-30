import { IUserStoreState } from '../../store/containers/user/interface';

export interface IAdminProps {
	userProps: IUserStoreState;
}
export interface IAdminStates {
	isAuthenticated: boolean;
}

export interface IAppProps {
	validateToken: () => Promise<void>;
}
export interface IAppStates { }

export interface IUserProps { }
export interface IUserStates { }

export interface IDispatchToProps {
	validateToken: () => Promise<void>;
}
