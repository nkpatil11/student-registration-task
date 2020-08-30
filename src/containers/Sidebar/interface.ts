import { IUserStoreState } from '../../store/containers/user/interface';

export interface ISidebarProps {
	userProps: IUserStoreState;
	validateToken: () => Promise<void>;
}
export interface ISidebarStates {}

export interface ISideBarComponentProps {
	userProps: IUserStoreState;
}

export interface IDispatchToProps {
	validateToken: () => Promise<void>;
}
