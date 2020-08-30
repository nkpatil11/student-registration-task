// INTERFACE
import { lazy } from 'react';
import { IAdminRoutes } from '../interfaces/routes.interface';
import uuidv4 from 'uuid/v4';

import studentIcon from '../../assets/img/sidebar/student.svg';
import studentIconBlack from '../../assets/img/sidebar/student-black.svg';
const Student = lazy(() => import('../../containers/Student'));
const StudentComponent = lazy(() => import('../../containers/Student/Student.component'));

const initialRoute: string = '/drawer';
const adminRoutes: IAdminRoutes[] = [
	{
		path: initialRoute + '/students',
		exact: true,
		isActive: true,
		show: true,
		main: Student,
		name: 'Students',
		nonActiveIcon: studentIcon,
		activeIcon: studentIconBlack,
		id: uuidv4(),
	},
	{
		path: initialRoute + '/students/add-student/:id?',
		exact: true,
		isActive: true,
		show: false,
		main: StudentComponent,
		name: 'Add Students',
		id: uuidv4(),
	},
	
];
export default adminRoutes;
