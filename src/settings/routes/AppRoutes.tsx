import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import appRoutes from '../configs/AppRoutes';
import History from '../helpers/History';
import { IDispatchToProps, IAppProps, IAppStates } from './interface';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { validateToken } from '../../store/actions';
import { connect } from 'react-redux';
import userRoutes from '../configs/UserRoutes';
import ScrollToTop from './ScrollToTop';

class AppRoutes extends Component<IAppProps, IAppStates> {
	componentDidMount = async () => {
		await this.props.validateToken();
	};

	render() {
		return (
			<Router history={History}>
				<ScrollToTop>
					<Switch>
						{userRoutes.map((r: any) => (
							<Route
								key={r.id}
								path={r.path}
								exact={r.exact}
								component={r.main}
							/>
						))}
						{appRoutes.map(r => (
							<Route
								key={r.id}
								path={r.path}
								exact={r.exact}
								component={r.main}
							/>
						))}
					</Switch>
				</ScrollToTop>
			</Router>
		);
	}
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AnyAction>
): IDispatchToProps => {
	return {
		validateToken: async () => {
			await dispatch(validateToken());
		},
	};
};

export default connect(null, mapDispatchToProps)(AppRoutes);
