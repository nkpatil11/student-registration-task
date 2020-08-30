import { match } from 'react-router';
import { Location, History } from 'history';

export interface IUserNavbarProps {
	location: Location;
	match: match;
	history: History;
}

export interface IUserNavbarStates {
	name: string;
}

export interface IUserNavbarComponentStates { }

export interface IDispatchToProps {
	onLogout: () => void;
}
