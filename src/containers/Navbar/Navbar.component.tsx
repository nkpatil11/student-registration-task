import React, { FormEvent, PureComponent } from 'react';
import History from '../../settings/helpers/History';
import { INavbarComponentProps, IDispatchToProps } from './interface';
import UserLogoIco from '../../assets/img/user.svg';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { onLogout } from '../../store/actions';
import { connect } from 'react-redux';
import { homeUrl } from '../../settings/helpers/constants';

class NavbarComponent extends PureComponent<INavbarComponentProps, {}> {
	state = {};

	signout = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		this.props.onLogout();
		localStorage.removeItem('id');
		sessionStorage.clear();
		History.replace(homeUrl);
	};

	render() {
		let isAccountVerified = true;

		let props: any = {};
		if (this.props.userProps) {
			props = { ...this.props.userProps };
			if (props.userInfo.email) {
				if (!props.userInfo.isAccountVerified) {
					isAccountVerified = false;
				}
			}
		}

		return (
			<nav className='navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
				<div className='navbar-menu-wrapper d-flex align-items-stretch'>
					<ul className='navbar-nav navbar-nav-right'>
						<li className='nav-item nav-profile dropdown'>
							<a
								className='nav-link dropdown-toggle'
								id='profileDropdown'
								href='.'
								data-toggle='dropdown'
								aria-expanded='false'
							>
								<div className='nav-profile-img'>
									<img src={UserLogoIco} alt='logo' />
									<span className='availability-status online'></span>
								</div>
								<div className='nav-profile-text ml-2'>
									<p className='mb-1 text-black  text-capitalize'>
										{(props.userInfo || {}).name}
									</p>
								</div>
							</a>
							<div
								className='dropdown-menu dropdown-reset'
								aria-labelledby='profileDropdown'
							>
								<div className='profile-drop-block'>
									<div className='profile-img'>
										<img src={UserLogoIco} alt='logo' />
									</div>
									<div className='user-deatils'>
										<div className='name  text-capitalize'>
											{props.userInfo.name}
										</div>
										<div className='emailid'>{props.userInfo.email}</div>
									</div>
								</div>
								<div className='dropdown-items'>
									<button className='btn btn-light' onClick={this.signout}>
										Logout
									</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AnyAction>
): IDispatchToProps => {
	return {
		onLogout: () => {
			dispatch(onLogout());
		},
	};
};

export default connect(null, mapDispatchToProps)(NavbarComponent);
