import React, { Fragment, MouseEvent, useState, lazy } from 'react';
import { IAdminRoutes } from '../../settings/interfaces/routes.interface';
import { NavLink } from 'react-router-dom';
import { ISideBarComponentProps } from './interface';
import sidebarClose from '../../assets/img/sidebar-close.svg';

import AdminRoutes from '../../settings/routes/AdminRoutes';
import adminRoutes from '../../settings/configs/AdminRoutes';

const Navbar = lazy(() => import('../Navbar'));

const SidebarComponent = (props: ISideBarComponentProps) => {
	const [showSidebar, setshowSidebar] = useState<boolean>(false);

	const stopClick = (event: MouseEvent) => {
		event.preventDefault();
	};

	const showSidebarFn = () => {
		setshowSidebar(showSidebar => !showSidebar);
	};

	let isAccountVerified = true;

	const { userInfo } = props.userProps;

	if (userInfo.email) {
		if (!userInfo.isAccountVerified) {
			isAccountVerified = false;
		}
	}

	return (
		<Fragment>
			<Navbar userProps={props.userProps} showSidebarFn={showSidebarFn} />
			<div
				className={showSidebar ? 'backdrop-sidebar' : ''}
				onClick={showSidebarFn}
			/>
			<div className='container-fluid page-body-wrapper'>
				<nav
					className={'sidebar sidebar-offcanvas ' + (showSidebar ? 'show' : '')}
					id='sidebar'
				>
					<div className='close-icon'>
						{showSidebar ? (
							<div onClick={showSidebarFn}>
								<img src={sidebarClose} alt='' />
							</div>
						) : null}
					</div>
					<ul className='nav custom-scrollbar'>
						{adminRoutes.map((k: IAdminRoutes) => {
							return k.show ? (
								<li key={k.id} className='nav-item'>
									<NavLink
										to={k.path}
										exact={k.exact}
										activeClassName='active'
										className='nav-link'
										onClick={(e: any) => {
											if (!k.isActive) {
												return stopClick;
											}
											showSidebarFn();
										}}
									>
										<span className='dash-icon'>
											<img
												className='non-active-ico'
												src={k.nonActiveIcon}
												alt=''
												width='20'
											/>
											<img
												className='active-ico'
												src={k.activeIcon}
												alt=''
												width='20'
											/>
										</span>
										<span className='menu-title'>{k.name}</span>
									</NavLink>
								</li>
							) : (
									undefined
								);
						})}
					</ul>
				</nav>
				<div className='main-panel'>
					<div className='content-wrapper'>
						<AdminRoutes />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default SidebarComponent;
