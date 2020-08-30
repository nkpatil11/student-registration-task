import React, {
	PureComponent,
	Fragment,
	lazy,
} from 'react';
import { IStudentListProps } from './interface';
import {
	Row,
	Col,
	Card,
	Button,
	Spinner,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import moment from 'moment';
import History from '../../settings/helpers/History';

const NoRecToShowComponent = lazy(() => import('../views/Table/NoRecToShow.component'));

class StudentListComponent extends PureComponent<IStudentListProps> {
	render() {
		const {
			students,
			loading,
			onRemove,
		} = this.props;
		return (
			<Fragment>
				{/* SHOWING STUDENT LIST */}
				<Row>
					<Col lg={12} className='grid-margin mob-card'>
						<Card>
							<Card.Header>
								<Card.Title>
									<span>Student List</span>
								</Card.Title>
								<div className='table-header-actions'>
									<Button
										variant='link'
										size='sm'
										onClick={() => {
											History.push('/drawer/students/add-student');
										}}
										className='add-new-btn'
									>
										<i className='fas fa-plus mr-2'></i> <span>Add Student</span>
									</Button>
								</div>
							</Card.Header>
							<Card.Body className='table-card-body dashboard-card-height'>
								<div className='table-responsive-wrap'>
									<table className='table'>
										<thead>
											<tr>
												<th className='image-block text-center'>Sr No.</th>
												<th className='name-block'>Information</th>
												<th className='email-block'>Gender</th>
												<th className='email-block'>DOB</th>
												<th className='email-block'>Address</th>
												<th className='email-block'>Country</th>
												<th className='action-block text-center'>Actions</th>
											</tr>
										</thead>
										<tbody>
											{loading ? (
												<tr className='no-hover-row'>
													<td colSpan={6}>
														<div className='d-flex justify-content-center align-items-center loading-div'>
															<Spinner animation='border' />
														</div>
													</td>
												</tr>
											) : students.length > 0 ? (
												students.map((item: any, index: number) => (
													<tr key={item._id}>
														<td className='table-checkbox-width'>
															{index + 1}.</td>
														<td>
															<div className='full-information-colum'>
																<div className='image-column'>
																	<img
																		src={item.profileImageUrl}
																		alt={''}
																	/>
																</div>
																<div className='info-column'>
																	<p
																		className='info-title mb-1 text-ellipsis'
																		onClick={() =>
																			History.push(
																				'/drawer/students/add-student?id=' +
																				item._id
																			)
																		}
																	>
																		{item.firstName}{' '}{item.lastName}{' s/o '}{item.fatherName}
																	</p>
																	<OverlayTrigger
																		placement={'top'}
																		overlay={
																			<Tooltip id='tooltip-email'>
																				{item.email}
																			</Tooltip>
																		}
																	>
																		<p className='mb-0 text-ellipsis'>
																			<i className='fas fa-envelope mr-1  text-bold'></i>
																			<span className='mr-2  text-bold'>
																				Email:
																			</span>
																			<span>{item.email}</span>
																		</p>
																	</OverlayTrigger>
																	<p className='mb-0'>
																		<i className='fas fa-phone-alt mr-1  text-bold'></i>
																		<span className='mr-2  text-bold'>
																			Mobile:
																		</span>
																		<span>{item.mobileNo}</span>
																	</p>
																</div>
															</div>
														</td>
														<td>
															<p className='mb-0 text-capitalize'>
																<span>
																	{item.gender}
																</span>
															</p>
														</td>
														<td>
															<p className='mb-0'>
																<span>
																	{moment(item.birthday).format('DD/MM/YYYY')}
																</span>
															</p>
														</td>
														<td>
															<p className='mb-0'>
																<span>
																	{item.address}
																</span>
															</p>
														</td>		
														<td>
															<p className='mb-0'>
																<span>
																	{item.country}
																</span>
															</p>
														</td>
														<td className='text-center'>
															<div className='action-buttons'>
																<OverlayTrigger
																	placement={'top'}
																	overlay={
																		<Tooltip id='tooltip-edit'>Edit</Tooltip>
																	}
																>
																	<span
																		className='btn-icon'
																		onClick={() => {
																			History.push(
																				'/drawer/students/add-student?id=' + item._id
																			);
																		}}
																	>
																		<i className='fas fa-edit'></i>
																	</span>
																</OverlayTrigger>
																<OverlayTrigger
																	placement={'top'}
																	overlay={
																		<Tooltip id='tooltip-delete'>
																			Delete
																		</Tooltip>
																	}
																>
																	<span
																		className='btn-icon'
																		onClick={() => onRemove(item._id)}
																	>
																		<i className='fas fa-trash'></i>
																	</span>
																</OverlayTrigger>
															</div>
														</td>
													</tr>
												))
											) : (
														<tr className='no-hover-row'>
															<td colSpan={6}>
																<NoRecToShowComponent
																	name={'student'}
																	link={'/drawer/students/add-student'}
																/>
															</td>
														</tr>
													)}
										</tbody>
									</table>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default StudentListComponent;
