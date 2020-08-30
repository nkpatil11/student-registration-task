import React, { lazy } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import emailIcon from '../../../assets/img/email.svg';
import loackIcon from '../../../assets/img/padlock.svg';
import { FormikProps } from 'formik';
import { ILoginFormComponent, ILoginFormComponentViewProps } from './interface';
import History from '../../../settings/helpers/History';

const FullPageLoader = lazy(() => import('../../views/FullPageLoader'));

const LoginFormComponent = (props: FormikProps<ILoginFormComponent> & ILoginFormComponentViewProps) => {
	const {
		values: { email, password },
		touched,
		errors,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		loader
	} = props;

	return (
		<>
			{loader ?
				<FullPageLoader />
				:
				<div className="main-block-wrapper">
					<div className='main-detail-page auth-page'>
						<div className="main-heading-wrap text-center">
							<div className="container">
								<h1 className="m-0">Log In </h1>
							</div>
						</div>
						<section className="contact-form-section">
							<div className="container">
								<Form className="auth-form-wrap" onSubmit={(e: any) => {
									e.preventDefault();
									handleSubmit();
								}} noValidate={true}>
									<Row>
										<Col md={12}>
											<Form.Group controlId='email' className='form-vld'>
												<Form.Label>
													Email Address<span className='required-field'> *</span>
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
										<Col md={12}>
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

									</Row>
									<div className="btn-wrap mt-4">
										<button className="btn btn-primary  w-100" type="submit" disabled={isSubmitting}> {isSubmitting ? <b><i className='fa fa-spinner fa-spin mr-2' /></b> : null} Login</button>
									</div>
									<p className="mt-3 text-center">Dont have an account? <span className="link-text" onClick={() => { History.push('/signup') }}>Sign Up</span></p>
								</Form>
							</div>
						</section>
					</div>
				</div>
			}
		</>
	);
};

export default LoginFormComponent;
