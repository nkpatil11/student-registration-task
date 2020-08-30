import React, { FunctionComponent } from 'react';
import './fourzerofour.scss';
import { Button, Row, Col } from 'react-bootstrap';
import { homeUrl } from '../../settings/helpers/constants';
import History from '../../settings/helpers/History';

const FourZeroFour: FunctionComponent = (props: any) => {
	return (
		<div className='notfoundcontainer'>
			<div id='notfound'>
				<div className="container">
					<Row className="align-items-center">
						<Col md={6} className="text-center text-md-left">
							<h2>Oops! This Page Could Not Be Found</h2>
							<p>
								Sorry but the page you are looking for does not exist, have been
								removed. name changed or is temporarily unavailable
							</p>
							<Button type='button' onClick={() => {
								History.push(homeUrl);
							}}>
								Go to Home page
					</Button>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default FourZeroFour;
