import React, { PureComponent } from 'react';
import { INavbarProps, INavbarStates } from './interface';
import NavbarComponent from './Navbar.component';

class Navbar extends PureComponent<INavbarProps, INavbarStates> {
	state: INavbarStates = {};

	componentDidMount = async () => {};

	render() {
		return (
			<NavbarComponent
				userProps={this.props.userProps}
				showSidebarFn={this.props.showSidebarFn}
			/>
		);
	}
}

export default Navbar;
