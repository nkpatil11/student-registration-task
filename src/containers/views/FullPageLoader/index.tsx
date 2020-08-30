import React, { FunctionComponent } from 'react';
import pageloader from '../../../assets/img/pageloader.gif';

const FullPageLoader: FunctionComponent = () => {
	return (
		<div className="pageloader-wrap">
			<img src={pageloader} alt='Loader' />
		</div>
	);
};

export default FullPageLoader;
