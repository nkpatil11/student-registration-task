// INTERFACE
import { IAppRoutes } from '../interfaces/routes.interface';
import uuidv4 from 'uuid/v4';

// CONTAINERS
import Sidebar from '../../containers/Sidebar';
import FourZeroFour from '../../containers/FourZeroFour';

const appRoutes: IAppRoutes[] = [
	{
		path: '/drawer',
		exact: false,
		main: Sidebar,
		id: uuidv4(),
	},
	{
		path: '**',
		exact: false,
		main: FourZeroFour,
		id: uuidv4(),
	},
];

export default appRoutes;
