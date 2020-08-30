import { match } from 'react-router';
import { Location, History } from 'history';
import { IReactSelect } from '../../settings/helpers/constants';

export interface IStudentProps {
	location: Location;
	match: match;
	history: History;
}
export interface IStudentStates {
	students: any[];
	loading: boolean;
}

export interface IStudentSelect {
	_id: string;
	name: string;
}

export interface IStudentForm {
	profileImage: File | null;
	firstName: string;
	lastName: string;
	fatherName: string;
	email: string;
	country?: IReactSelect;
	mobileNo: string;
	birthday: Date;
	address: string;
	gender: string;
}

export interface IStudentFormState {
	studentDetails: any;
	isEdit: boolean;
}

export interface IStudentListProps {
	students: any[];
	loading: boolean;
	onRemove: any;
}


export interface IStudentComponentProps { }
export interface IStudentComponentStates extends IStudentFormState {
	loading: boolean;
	studentId: string;
	selectedCountry: any;
}
export interface IStudentFormProps {
	isEdit: boolean;
	loading: boolean;
}
