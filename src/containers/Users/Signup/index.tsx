import React, { Fragment, PureComponent, lazy } from 'react';
import {
	ISignupFormComponent,
	ISignupProps,
	ISignupStates,
	IDispatchToProps,
} from './interface';
import { Formik, FormikProps, FormikActions } from 'formik';
import * as Yup from 'yup';
import { ISignupStoreState } from '../../../store/containers/signup/interface';
import { IUserStoreState } from '../../../store/containers/user/interface';
import {
	showSuccessToast,
	showErrorToast,
} from '../../../settings/helpers/toast';
import { IAppState } from '../../../store/reducers';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { userSignup } from '../../../store/actions';
import { connect } from 'react-redux';

const SignupFormComponent = lazy(() => import('./SignupForm.component'));

class Signup extends PureComponent<ISignupProps, ISignupStates> {
	state: ISignupStates = {};
	signupProps: ISignupStoreState = this.props.signupProps;
	userProps: IUserStoreState = this.props.userProps;
	userSignup = this.props.userSignup;

	componentDidUpdate = async (prevProps: ISignupProps) => {
		if (prevProps.signupProps !== this.props.signupProps) {
			this.signupProps = this.props.signupProps;
		}
	};

	onSignup = async (
		values: ISignupFormComponent,
		actions: FormikActions<ISignupFormComponent>
	): Promise<void> => {
		actions.setSubmitting(true);
		await this.userSignup(values);
		if (this.signupProps.success) {
			actions.resetForm();
			actions.setSubmitting(false);
			showSuccessToast(this.signupProps.successMsg);
		} else {
			actions.setSubmitting(false);
			showErrorToast(this.signupProps.errMessage);
		}
	};

	render() {
		const values: ISignupFormComponent = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
		const SignupSchema: Yup.ObjectSchema<Yup.Shape<
			object,
			ISignupFormComponent
		>> = Yup.object().shape<ISignupFormComponent>({
			firstName: Yup.string()
				.trim()
				.min(2, 'First name field must be at least 2 characters in length')
				.max(15, 'First name field cannot be more than 15 characters in length')
				.matches(/^[a-zA-Z]+$/, 'First Name must contain alphabets only')
				.required('First name is required.'),
			lastName: Yup.string()
				.trim()
				.min(2, 'Last name must be at least 2 characters in length')
				.max(15, 'Last name cannot be more than 15 characters in length')
				.matches(/^[a-zA-Z]+$/, 'Last Name must contain alphabets only')
				.required('Last name is required'),
			email: Yup.string()
				.trim()
				.email('Email must contain a valid email address')
				.required('Email is required'),
			password: Yup.string()
				.min(6, 'Password must be at least 6 characters in length')
				.max(18, 'Password cannot be more than 18 characters in length')
				.required('Password is required'),
			confirmPassword: Yup.string().when('password', {
				is: (val: string | undefined) => val && val.length > 0,
				then: Yup.string()
					.required('Confirm password is required')
					.min(6, 'Password must be at least 6 characters in length')
					.max(18, 'Password cannot be more than 18 characters in length')
					.oneOf([Yup.ref('password'), null], "Passwords don't match"),
				otherwise: Yup.string()
					.min(6, 'Password must be at least 6 characters in length')
					.max(18, 'Password cannot be more than 18 characters in length')
					.required('Confirm password is required'),
			}),
		});

		return (
			<Fragment>
				<Formik
					render={(formikBag: FormikProps<ISignupFormComponent>) => (
						<SignupFormComponent {...formikBag}  {...this.props} />
					)}
					initialValues={values}
					validationSchema={SignupSchema}
					onSubmit={this.onSignup}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		signupProps: state.signupState,
		userProps: state.userState,
	};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AnyAction>
): IDispatchToProps => {
	return {
		userSignup: async (payload: ISignupFormComponent) => {
			await dispatch(userSignup(payload));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
