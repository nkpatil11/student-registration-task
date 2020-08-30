import React, { Fragment, PureComponent, lazy } from 'react';
import { Formik, FormikProps, FormikActions } from 'formik';
import * as Yup from 'yup';
import {
	ILoginFormComponent,
	IDispatchToProps,
	ILoginStates,
	ILoginProps,
} from './interface';
import { showErrorToast } from '../../../settings/helpers/toast';
import History from '../../../settings/helpers/History';
import { connect } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userLogin, validateToken } from '../../../store/actions';
import { ILoginStoreState } from '../../../store/containers/login/interface';

const LoginFormComponent = lazy(() => import('./LoginForm.component'));

class Login extends PureComponent<ILoginProps> {
	state: ILoginStates = {
		loader: false
	};
	loginProps: ILoginStoreState = this.props.loginProps;
	userLogin = this.props.userLogin;

	componentDidUpdate = async (prevProps: ILoginProps) => {
		if (prevProps.loginProps !== this.props.loginProps) {
			this.loginProps = this.props.loginProps;
		}
	};

	onLogin = async (
		values: ILoginFormComponent,
		actions: FormikActions<ILoginFormComponent>
	): Promise<void> => {
		actions.setSubmitting(true);
		await this.userLogin(values);
		if (this.loginProps.success) {
			await this.props.validateToken();
			actions.resetForm();
			actions.setSubmitting(false);
			History.replace('/drawer/students');
		} else {
			actions.setSubmitting(false);
			showErrorToast(this.loginProps.errMessage);
		}
	};

	render() {

		const values: ILoginFormComponent = {
			email: '',
			password: '',
		};

		const LoginSchema: Yup.ObjectSchema<Yup.Shape<
			object,
			ILoginFormComponent
		>> = Yup.object().shape<ILoginFormComponent>({
			email: Yup.string()
				.trim()
				.email('Email field must contain a valid email address')
				.required('Email field is required'),
			password: Yup.string()
				.min(6, 'Password field must be at least 6 characters in length')
				.max(18, 'Password field cannot be more than 18 characters in length')
				.required('Password field is required'),
		});

		return (
			<Fragment>
				<Formik
					render={(formikBag: FormikProps<ILoginFormComponent>) => (
						<LoginFormComponent {...formikBag} {...this.props} loader={this.state.loader}
						/>
					)}
					initialValues={values}
					validationSchema={LoginSchema}
					onSubmit={this.onLogin}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		loginProps: state.loginState,
		userProps: state.userState,
	};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AnyAction>
): IDispatchToProps => {
	return {
		userLogin: async (payload: ILoginFormComponent) => {
			await dispatch(userLogin(payload));
		},
		validateToken: async () => {
			await dispatch(validateToken());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
