import { IUserStoreState } from '../../store/containers/user/interface';

export interface INavbarProps {
	userProps: IUserStoreState;
	showSidebarFn: () => void;
}
export interface INavbarStates {}

export interface INavbarComponentProps {
	userProps: IUserStoreState;
	onLogout: () => void;
	showSidebarFn: () => void;
}

export interface IDispatchToProps {
	onLogout: () => void;
}
