import React, { PureComponent, lazy } from 'react';

import UserRoutes from '../../settings/routes/UserRoutes';
const UserNavbarComponent = lazy(() => import('../Users/UserNavbar/UserNavbar.component'));
const FooterComponent = lazy(() => import('../Users/Footer/Footer.component'));

class Layout extends PureComponent {
	render() {
		return (
			<div className='home-page-wrapper'>
				<UserNavbarComponent />
				<UserRoutes />
				<FooterComponent />
			</div>
		)
	}
}

export default Layout;
