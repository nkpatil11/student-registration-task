import React, {
	PureComponent,
	Fragment,
	lazy,
} from 'react';
import { IStudentProps, IStudentStates } from './interface';
import { showSuccessToast } from '../../settings/helpers/toast';
import {
	logger,
	asyncSetState,
	confirmBox,
} from '../../settings/helpers/Common';
import { ApiHelper } from '../../settings/helpers/ApiHelper';
import { withRouter } from 'react-router';

const StudentListComponent = lazy(() => import('./StudentList.component'));

class Student extends PureComponent<IStudentProps, IStudentStates> {
	state: IStudentStates = {
		students: [],
		loading: false,
	};

	componentDidMount = async () => {
		await this.fetchStudents();
	};

	componentDidUpdate = async (prevProps: IStudentProps) => {
		if (prevProps.location !== this.props.location) {
			await this.fetchStudents();
		}
	};

	fetchStudents = async () => {
		try {
			await asyncSetState(this)({ ...this.state, loading: true });

			const result: any = await new ApiHelper().FetchFromServer(
				'/',
				`students/getAllStudents`,
				'GET',
				true,
				undefined,
				undefined
			);

			if (result.isError) {
				throw new Error(result.messages);
			}

			const { data } = result;
			if (data.statusCode === 200 && data.success) {
				this.setState({
					students: data.data,
					loading: false,
				});
			}
		} catch (error) {
			logger(error);
			this.setState({
				students: [],
				loading: false,
			});
		}
	};

	onRemove = async (studentId: any) => {
		const { value } = await confirmBox({
			title: 'Are you sure?',
			text: 'Do you want to delete this student?'
		});
		if (value) {
			try {
				const res = await new ApiHelper().FetchFromServer(
					'/',
					'students/remove',
					'POST',
					true,
					undefined,
					{studentId}
				);

				if (res.data.statusCode === 200) {
					showSuccessToast(res.data.message);
					this.fetchStudents();
				}
			} catch (error) { }
		} else {
			return;
		}
	};

	render() {
		return (
			<Fragment>
				<div className='page-header-wrap'>
					<StudentListComponent
						{...this.state}
						onRemove={this.onRemove}
					/>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(Student);
