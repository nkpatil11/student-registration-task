import React, { Fragment, PureComponent, lazy } from 'react';
import {
	IStudentComponentProps,
	IStudentComponentStates,
	IStudentForm,
} from './interface';
import * as Yup from 'yup';
import { Formik, FormikProps, FormikActions } from 'formik';
import { ApiHelper } from '../../settings/helpers/ApiHelper';
import { showErrorToast, showSuccessToast } from '../../settings/helpers/toast';
import {
	logger,
	asyncSetState,
} from '../../settings/helpers/Common';
import History from '../../settings/helpers/History';
import * as qs from 'query-string';
import moment from 'moment';
import { countrySchema } from '../../settings/helpers/constants';
const PageLoader = lazy(() => import('../views/PageLoader'));
const StudentFormComponent = lazy(() => import('./StudentForm.component'));

class StudentComponent extends PureComponent<
	IStudentComponentProps,
	IStudentComponentStates
	> {
	state: IStudentComponentStates = {
		studentDetails: {},
		isEdit: false,
		studentId: '',
		loading: true,
		selectedCountry: {},
	};

	componentDidMount = async () => {
		let search: any = {};
		search = { ...qs.parse(History.location.search) };
		if (search.id) {
			this.fetchStudentData(search.id);
		}
	};

	fetchStudentData = async (studentId: string) => {
		try {
			await asyncSetState(this)({ ...this.state, loading: true, isEdit: true });
			const result: any = await new ApiHelper().FetchFromServer(
				'/',
				`students/getStudentDetails?studentId=${studentId}`,
				'GET',
				true,
				undefined,
				undefined
			);

			console.log('result ',result);
			

			if (result.isError) {
				throw new Error(result.messages);
			}

			const { data } = result;
			if (data.statusCode === 200 && data.success) {
				if (data.data.length) {
					let selectedCountry: any[] = [];

					if (data.data[0].country) {
						selectedCountry = countrySchema.filter((v: any) => v.value === data.data[0].country);
					}

					const cover: File | null = data.data[0].profileImageUrl;
					const studentData: any = {
						...data.data[0],
						cover,
					};

					await asyncSetState(this)({
						...this.state,
						studentDetails: studentData,
						isEdit: true,
						studentId: studentData._id,
						loading: false,
						selectedCountry
					});
				}
			}
		} catch (error) {
			logger(error);
			this.setState({ loading: false });
		}
	};

	onStudentSave = async (
		values: IStudentForm,
		actions: FormikActions<IStudentForm>
	) => {
		actions.setSubmitting(true);
		const { isEdit, studentDetails } = this.state;
		try {
			let file: FormData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				switch (key) {
					case 'country':
						file.append('country', value.value);
						break;

					case 'profileImage':
						file.append('profileImage', value);
						break;

					default:
						file.append(key, value);
						break;
				}
			});

			file.append('studentId', this.state.studentId);

			let apiUrl = 'save';
			if (isEdit) {
				apiUrl = 'update';
			}

			const result: any = await new ApiHelper().FetchFromServer(
				'/',
				'students/' + apiUrl,
				'POST',
				true,
				undefined,
				file
			);

			if (result.isError) {
				throw new Error(result.messages);
			}

			const { data } = result;
			if (data.statusCode === 200 && data.success) {
				showSuccessToast(data.message);
				actions.resetForm();
				actions.setSubmitting(false);
				History.push('/drawer/students');
				if (isEdit) {
					this.fetchStudentData(studentDetails._id);
				}
			}
		} catch (error) {
			actions.setSubmitting(false);
			showErrorToast(error.message);
			logger(error);
		}
	};

	render() {
		let { studentDetails, selectedCountry, isEdit, loading } = this.state;

		const values: IStudentForm = {
			profileImage: studentDetails.profileImageUrl || null,
			firstName: studentDetails.firstName || '',
			lastName: studentDetails.lastName || '',
			fatherName: studentDetails.fatherName || '',
			email: studentDetails.email || '',
			mobileNo: studentDetails.mobileNo || '',
			address: studentDetails.address || '',
			gender: studentDetails.gender || '',
			country: selectedCountry.length > 0 ? selectedCountry[0] : undefined,
			birthday: studentDetails.birthday ||
				moment()
					.subtract(18, 'years')
					.toDate(),
		};
		const StudentFormSchema: Yup.ObjectSchema<Yup.Shape<
			object,
			IStudentForm
		>> = Yup.object().shape<IStudentForm>({
			profileImage: Yup.mixed().required('Profile image is required'),
			firstName: Yup.string()
				.trim()
				.min(3, 'First Name cannot be less than 3 characters')
				.max(100, 'First Name cannot be more than 100 characters')
				.required('First Name is required'),
			lastName: Yup.string()
				.trim()
				.min(3, 'Last Name cannot be less than 3 characters')
				.max(100, 'Last Name cannot be more than 100 characters')
				.required('Last Name is required'),
			fatherName: Yup.string()
				.trim()
				.min(3, 'Father Name cannot be less than 3 characters')
				.max(100, 'Father Name cannot be more than 100 characters')
				.required('Father Name is required'),
			email: Yup.string()
				.trim()
				.email('Invalid email id')
				.required('Email is required'),
			mobileNo: Yup.string()
				.required('Mobile number is required'),
			birthday: Yup.date().required('Date of birth is required'),
			gender: Yup.string(),
			address: Yup.string()
				.trim()
				.min(5, 'Address cannot be less than 5 characters')
				.max(500, 'Address cannot be more than 500 characters'),
		});

		return (
			<Fragment>
				{this.state.loading && isEdit ?
					<PageLoader />
					:
					<Formik
						render={(formikBag: FormikProps<IStudentForm>) => (
							<StudentFormComponent
								{...formikBag}
								isEdit={isEdit}
								loading={loading}
							/>
						)}
						enableReinitialize={true}
						initialValues={values}
						validationSchema={StudentFormSchema}
						onSubmit={this.onStudentSave}
					/>
				}
			</Fragment>
		);
	}
}

export default StudentComponent;
