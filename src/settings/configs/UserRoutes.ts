// INTERFACE
import { lazy } from 'react';
import { IUserRoutes } from '../interfaces/routes.interface';
import uuidv4 from 'uuid/v4';

const Layout = lazy(() => import('../../containers/Layout'));
const SignUp = lazy(() => import('../../containers/Users/Signup'));
const Login = lazy(() => import('../../containers/Users/Login'));

const userRoutes: IUserRoutes[] = [
	{
		path: '/',
		exact: true,
		isActive: true,
		show: false,
		main: Layout,
		component: Login,
		name: 'Login',
		id: uuidv4(),
	},
	{
		path: '/login',
		exact: true,
		isActive: true,
		show: false,
		main: Layout,
		component: Login,
		name: 'Login',
		id: uuidv4(),
	},
	{
		path: '/signup',
		exact: true,
		isActive: true,
		show: false,
		main: Layout,
		component: SignUp,
		name: 'SignUp',
		id: uuidv4(),
	},
];

export default userRoutes;
