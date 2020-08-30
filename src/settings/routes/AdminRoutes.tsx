import React, { Component, lazy } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import adminRoutes from '../configs/AdminRoutes';
import History from '../helpers/History';
import { IAppState } from '../../store/reducers';
import { connect } from 'react-redux';
import { IAdminProps, IAdminStates } from './interface';
const FullPageLoader = lazy(() => import('../../containers/views/FullPageLoader'));

class AdminRoutes extends Component<IAdminProps, IAdminStates> {
	render() {
		const { userProps } = this.props;
		const { isAuthenticated } = userProps;

		return (
			<Router history={History}>
				<Switch>
					<React.Suspense fallback={<FullPageLoader />}>
						{adminRoutes.map(r => (
							<Route
								key={r.id}
								path={r.path}
								exact={r.exact}
								render={() =>
									isAuthenticated ? (
										<r.main />
									) : (
											<Redirect to={'/'} />
										)
								}
							/>
						))}
					</React.Suspense>
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		userProps: state.userState,
	};
};

export default connect(mapStateToProps)(AdminRoutes);
