import React, { PureComponent } from 'react';
import { IUserNavbarComponentStates, IDispatchToProps } from './interface';
import History from '../../../settings/helpers/History';
import { connect } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import * as constants from '../../../settings/helpers/constants';
import { onLogout } from '../../../store/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
	Navbar,
	Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class UserNavbarComponent extends PureComponent<
	any,
	IUserNavbarComponentStates
	> {
	state: IUserNavbarComponentStates = {};

	signout = () => {
		if (localStorage.getItem(constants.id)) {
			this.props.onLogout();
			localStorage.removeItem('id');
			sessionStorage.clear();
			History.push(constants.homeUrl)
		}
	};

	render() {
		return (
			<div className='navbar-sticky bg-light navbar-home-page'>
				<Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
					<Navbar.Collapse id="responsive-navbar-nav">
						<div className="nav-wrap ml-auto">
							<Nav>
								{this.props.userProps && this.props.userProps.isAuthenticated ?
									<Link className="nav-link" to="" onClick={this.signout}>Logout</Link>
									:
									<>
										<Link className="nav-link" to={`/signup`}>Signup</Link>
										<Link className="nav-link" to={`/login`}>Login</Link>
									</>
								}
							</Nav>
						</div>

					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		userProps: state.userState,
	};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AnyAction>
): IDispatchToProps => {
	return {
		onLogout: () => {
			dispatch(onLogout());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserNavbarComponent);
