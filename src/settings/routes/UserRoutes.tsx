import React, { Component, lazy } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import userRoutes from '../configs/UserRoutes';
import History from '../helpers/History';
import { IUserProps, IUserStates } from './interface';
const FullPageLoader = lazy(() => import('../../containers/views/FullPageLoader'));

class UserRoutes extends Component<IUserProps, IUserStates> {
	render() {
		return (
			<Router history={History}>
				<Switch>
					<React.Suspense fallback={<FullPageLoader />}>
						{userRoutes.map(r => (
							<Route
								key={r.id}
								path={r.path}
								exact={r.exact}
								render={() => <r.component />}
							/>
						))}
					</React.Suspense>
				</Switch>
			</Router>
		);
	}
}

export default UserRoutes;
