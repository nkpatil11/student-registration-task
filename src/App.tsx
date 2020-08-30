import React, { Fragment } from 'react';
import AppRoutes from './settings/routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	return (
		<Fragment>
			<AppRoutes />
			<ToastContainer
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				draggable
				pauseOnHover
			/>
		</Fragment>
	);
};

export default App;
