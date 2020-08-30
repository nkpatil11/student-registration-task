import React, { FunctionComponent, Fragment } from 'react';
import './pageloader.scss';

const PageLoader: FunctionComponent = () => {
	return (
		<Fragment>
			<div className='loader-block loader-full-page'>
				<div className='loader'>
					<svg className='circular-loader' viewBox='25 25 50 50'>
						<circle
							className='loader-path'
							cx='50'
							cy='50'
							r='20'
							fill='none'
							stroke='#506de4'
							strokeWidth='2.5'
						/>
					</svg>
				</div>
			</div>
		</Fragment>
	);
};

export default PageLoader;
