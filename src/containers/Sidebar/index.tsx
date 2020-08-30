import React, { PureComponent, lazy } from 'react';
import { ISidebarProps, ISidebarStates } from './interface';
import { connect } from 'react-redux';
import { IAppState } from '../../store/reducers';

const SidebarComponent = lazy(() => import('./Sidebar.component'));

class Sidebar extends PureComponent<ISidebarProps, ISidebarStates> {
	state: ISidebarStates = {};

	componentDidMount = async () => { };

	render() {
		return <SidebarComponent userProps={this.props.userProps} />;
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		userProps: state.userState,
	};
};

export default connect(mapStateToProps, null)(Sidebar);
