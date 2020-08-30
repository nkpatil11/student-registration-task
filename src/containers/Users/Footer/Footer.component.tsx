import React, { Fragment, PureComponent } from 'react';
import { IFooterComponentStates } from './interface';

class FooterComponent extends PureComponent<IFooterComponentStates> {
	state: IFooterComponentStates = {};

	render() {
		return (
			<Fragment>
				<footer className='footer-bg main-footer pt-3  pt-md-5'>
					<div className='footer-bg'>
						<div className='container'>
							<div className='py-3 font-size-sm   text-center d-flex align-items-center justify-content-center'>
								© All rights reserved.
								</div>
						</div>
					</div>
				</footer>
			</Fragment>
		);
	}
}

export default FooterComponent;
