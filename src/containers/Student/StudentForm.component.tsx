import React, { Fragment, MouseEvent } from 'react';
import { FormikProps } from 'formik';
import { IStudentForm, IStudentFormProps } from './interface';
import {
	Row,
	Col,
	Card,
	Form,
	Button,
} from 'react-bootstrap';
import {
	imageValidateAndSave,
	blobUrl,
} from '../../settings/helpers/Common';
import History from '../../settings/helpers/History';
import Flatpickr from 'react-flatpickr';
import { AcceptedImageFormat } from '../../settings/configs/AppConfigs';
import { countrySchema } from '../../settings/helpers/constants';
import Select from 'react-select';

const StudentFormComponent = (
	props: FormikProps<IStudentForm> & IStudentFormProps
) => {

	const {
		values: {
			profileImage,
			firstName,
			lastName,
			fatherName,
			email,
			mobileNo,
			address,
			birthday,
			gender,
			country
		},
		touched,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
		setFieldError,
		isEdit,
	} = props;

	const profileImageUrl  = profileImage && blobUrl(profileImage);

	const element: JSX.Element = (
		<>
			<Row>
				<Col lg={12} className='grid-margin'>
					<Card>
						<Card.Header>
							<Card.Title>
								<span>Information</span>
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<Row>
								{/* LEFT SECTION */}
								<Col lg={6}>
									<Row>
										<Col lg={12}>
											<Form.Group controlId='profileImage'>
												<Form.Label>
													Profile Image
													<span className='required-field'> *</span>
												</Form.Label>
												<label className='file-input-upload profile-wrap half-profile'>
													<div className='file-input-inner-upload text-center'>
														{profileImageUrl ? (
															<div className='img-preview'>
																<img
																	src={`${profileImageUrl}`}
																	alt=''
																	className='custom-preview-img'
																/>
															</div>
														) : (
																<>
																	<img
																		src='/assets/img/upload-ic.svg'
																		alt='upload'
																	/>
																	<h6>Select file to upload profile image</h6>
																	<p className='mb-0'>
																		200 x 200px ideal for hi-res
																</p>
																</>
															)}
														<Form.Control
															type='file'
															placeholder=''
															aria-describedby='profileImage'
															name='profileImage'
															onChange={(event: any) => {
																imageValidateAndSave(
																	event.currentTarget.files[0],
																	setFieldValue,
																	setFieldError,
																	'profileImage',
																	200,
																	200
																);
															}}
															onBlur={handleBlur}
															isValid={touched.profileImage && !errors.profileImage}
															isInvalid={touched.profileImage && !!errors.profileImage}
															autoComplete='profileImage'
															accept={AcceptedImageFormat.join()}
														/>
													</div>
												</label>
												<Form.Control.Feedback
													type='invalid'
													style={{
														display:
															touched.profileImage && !!errors.profileImage
																? 'block'
																: 'none',
													}}
												>
													{errors.profileImage}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
									</Row>
								</Col>
								{/* LEFT SECTION */}
								{/* RIGHT SECTION */}
								<Col lg={6}>
									<Row>
										<Col lg={6}>
											<Form.Group controlId='firstName'>
												<Form.Label>First Name <span className='required-field'> *</span> </Form.Label>
												<Form.Control
													type='text'
													placeholder=''
													aria-describedby='firstName'
													name='firstName'
													value={firstName}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.firstName && !errors.firstName}
													isInvalid={touched.firstName && !!errors.firstName}
													autoComplete='firstName'
												/>
												<Form.Control.Feedback type='invalid'>
													{errors.firstName}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group controlId='lastName'>
												<Form.Label>Last Name <span className='required-field'> *</span> </Form.Label>
												<Form.Control
													type='text'
													placeholder=''
													aria-describedby='lastName'
													name='lastName'
													value={lastName}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.lastName && !errors.lastName}
													isInvalid={touched.lastName && !!errors.lastName}
													autoComplete='lastName'
												/>
												<Form.Control.Feedback type='invalid'>
													{errors.lastName}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group controlId='fatherName'>
												<Form.Label>Father Name <span className='required-field'> *</span> </Form.Label>
												<Form.Control
													type='text'
													placeholder=''
													aria-describedby='fatherName'
													name='fatherName'
													value={fatherName}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.fatherName && !errors.fatherName}
													isInvalid={touched.fatherName && !!errors.fatherName}
													autoComplete='fatherName'
												/>
												<Form.Control.Feedback type='invalid'>
													{errors.fatherName}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group controlId='email'>
												<Form.Label>
													Email
													<span className='required-field'> *</span>
												</Form.Label>
												<Form.Control
													type='email'
													placeholder=''
													aria-describedby='email'
													name='email'
													value={email}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.email && !errors.email}
													isInvalid={touched.email && !!errors.email}
													autoComplete='email'
												/>
												<Form.Control.Feedback type='invalid'>
													{errors.email}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group controlId='mobileNo'>
												<Form.Label>
													Mobile No.
													<span className='required-field'> *</span>
												</Form.Label>
												<Form.Control
													type='number'
													placeholder=''
													aria-describedby='mobileNo'
													name='mobileNo'
													minLength={9}
													maxLength={14}
													value={mobileNo}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.mobileNo && !errors.mobileNo}
													isInvalid={touched.mobileNo && !!errors.mobileNo}
													autoComplete='mobileNo'
												/>
												<div
													className='invalid-feedback'
													style={
														touched.mobileNo && errors.mobileNo
															? { display: 'block' }
															: { display: 'none' }
													}
												>
													{errors.mobileNo}
												</div>
											</Form.Group>
										</Col>

										<Col lg={6}>
											<Form.Group controlId='birthday'>
												<Form.Label>
													DOB{' '}
													<span className='required-field'> *</span>
												</Form.Label>
												<div className='custom-datepick-design'>
													<Flatpickr
														value={birthday}
														className='form-control'
														options={{
															enableTime: false,
															altInput: true,
															altFormat: 'F j, Y',
															dateFormat: 'Y-m-d',
															minDate: new Date(
																new Date().setFullYear(
																	new Date().getFullYear() - 60
																)
															),
															maxDate: new Date(
																new Date().setFullYear(
																	new Date().getFullYear() - 18
																)
															),
														}}
														onChange={(date: Date[]) =>
															date.length
																? setFieldValue(
																	'birthday',
																	new Date(
																		new Date(date[0]).setHours(0, 0, 0, 0)
																	)
																)
																: setFieldValue('birthday', undefined)
														}
														onClose={selectedDates => {
															if (!selectedDates.length) {
																setFieldValue(
																	'birthday',
																	new Date(
																		new Date(
																			new Date().setFullYear(
																				new Date().getFullYear() - 18
																			)
																		).setHours(0, 0, 0, 0)
																	)
																);
															}
														}}
													/>
												</div>

												<Form.Text className='text-muted error-field'>
													<span className='error'>{errors.birthday}</span>
												</Form.Text>
											</Form.Group>
										</Col>
										<Col md={6}>
											<Form.Group controlId="gender">
												<Form.Label>Gender </Form.Label>
												<div className="d-flex mt-2">
													<Form.Check
														type="radio"
														label="Male"
														name="gender"
														value={'male'}
														checked={gender === 'male'}
														id="gender1"
														className="mr-3"
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<Form.Check
														type="radio"
														label="Female"
														name="gender"
														value={'female'}
														checked={gender === 'female'}
														id="gender2"
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</div>
												<div className='invalid-feedback'
													style={
														touched.gender && errors.gender ? { display: 'block' } : { display: 'none' }
													}
												>
													{errors.gender}
												</div>
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group controlId='country'>
												<Form.Label>
													Country
											<span className='required-field'> *</span>
												</Form.Label>
												<Select
													placeholder='Select Country'
													aria-describedby='country'
													name={'country'}
													value={country && country.value ? country : undefined}
													options={countrySchema}
													isClearable={true}
													onChange={async (event: any) => {
														if (event) {
															setFieldValue('country', event);
														} else {
															setFieldValue('country', undefined);
														}
													}}
												/>
												<Form.Control.Feedback
													style={{ display: (touched.country && errors.country ? 'block' : 'none') }} type='invalid'>
													{errors.country}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col lg={12}>
											<Form.Group controlId='address'>
												<Form.Label>Address</Form.Label>
												<Form.Control
													as='textarea'
													rows={2}
													maxLength={500}
													type='text'
													placeholder=''
													aria-describedby='address'
													name='address'
													value={address}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.address && !errors.address}
													isInvalid={touched.address && !!errors.address}
													autoComplete='address'
												/>
												<Form.Control.Feedback type='invalid'>
													{errors.address}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
									</Row>
								</Col>
								{/* RIGHT SECTION */}
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Form.Group className='d-flex justify-content-end'>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? <b><i className='fa fa-spinner fa-spin mr-2' /></b> : null}	{isEdit ? 'Update' : 'Save'}
				</Button>
			</Form.Group>
		</>
	);

	return (
		<Fragment>
			<Form
				onSubmit={(e: any) => {
					e.preventDefault();
					handleSubmit();
				}}
				noValidate={true}
				className='form-section student-form'
			>
				<div className='page-header-wrap'>
					<div className='page-header'>
						<h3 className='page-title'>
							<span
								onClick={(e: MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									History.goBack();
								}}
							>
								<i className='fas fa-arrow-left link-text'></i>
							</span>
							<span className='heading-text'>
								{isEdit ? 'Edit Student' : 'Add Student'}
							</span>
						</h3>
					</div>
					{element}
				</div>
			</Form>
		</Fragment>
	);
};

export default StudentFormComponent;
