import React from 'react';
import { FormikProps } from 'formik';
import { ISignupFormComponent, ISignupFormComponentViewProps } from './interface';
import { Col, Row, Form } from 'react-bootstrap';
import emailIcon from '../../../assets/img/email.svg';
import nameIcon from '../../../assets/img/user-new.svg';
import loackIcon from '../../../assets/img/padlock.svg';
import History from '../../../settings/helpers/History';

const SignupFormComponent = (props: FormikProps<ISignupFormComponent> & ISignupFormComponentViewProps) => {

	const {
		values: {
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		},
		touched,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
	} = props;


	return (
		<>
			<div className="main-block-wrapper">
				<div className='main-detail-page auth-page'>
					<div className="main-heading-wrap text-center">
						<div className="container">
							<h1 className="m-0">Sign Up </h1>
						</div>
					</div>
					<section className="contact-form-section">
						<div className="container">
							<Form className="auth-form-wrap signup-form"
								onSubmit={(e: any) => {
									e.preventDefault();
									handleSubmit();
								}}
								noValidate={true}>
								<Row>
									<Col md={8}>
										<Row>
											<Col md={6}>
												<Form.Group controlId='firstname' className='form-vld'>
													<Form.Label>
														First Name<span className='required-field'> *</span>
													</Form.Label>
													<img
														src={nameIcon}
														alt='Name Icon'
														width="15"
													/>
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
														autoComplete='off'
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.firstName}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group controlId='lastname' className='form-vld'>
													<Form.Label>
														Last Name <span className='required-field'> *</span>
													</Form.Label>
													<img
														src={nameIcon}
														alt='Name Icon'
														width="15"
													/>
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
														autoComplete='off'
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.lastName}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group controlId='email' className='form-vld'>
													<Form.Label>
														Email Address <span className='required-field'> *</span>
													</Form.Label>
													<img
														src={emailIcon}
														alt='Email Icon'
														width="15"
													/>
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
														autoComplete='off'
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.email}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group controlId='password' className='form-vld'>
													<Form.Label>
														Password<span className='required-field'> *</span>
													</Form.Label>
													<img
														src={loackIcon}
														alt='Loack Icon'
														width="15"
													/>
													<Form.Control
														type='password'
														placeholder=''
														aria-describedby='password'
														name='password'
														value={password}
														onChange={handleChange}
														onBlur={handleBlur}
														isValid={touched.password && !errors.password}
														isInvalid={touched.password && !!errors.password}
														autoComplete='off'
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.password}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group controlId='password' className='form-vld'>
													<Form.Label>
														Confirm Password <span className='required-field'> *</span>
													</Form.Label>
													<img
														src={loackIcon}
														alt='Loack Icon'
														width="15"
													/>
													<Form.Control
														type='password'
														placeholder=''
														aria-describedby='confirmPassword'
														name='confirmPassword'
														value={confirmPassword}
														onChange={handleChange}
														onBlur={handleBlur}
														isValid={touched.confirmPassword && !errors.confirmPassword}
														isInvalid={touched.confirmPassword && !!errors.confirmPassword}
														autoComplete='off'
													/>
													<Form.Control.Feedback type='invalid'>
														{errors.confirmPassword}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>

											{/* ============= STUDIO DETAILS SECTION ENDS ============= */}

										</Row>

									</Col>
								</Row>
								<div className="btn-wrap mt-3 text-center">
									<button className="btn btn-primary signup-btn" disabled={isSubmitting} type="submit"> {isSubmitting ? <b><i className='fa fa-spinner fa-spin mr-2' /></b> : null} Sign Up</button>
								</div>
								<p className="mb-0 mt-3  text-center">Already have an account? <span className="link-text" onClick={() => History.push('/login')}> Login</span></p>
							</Form>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default SignupFormComponent;
