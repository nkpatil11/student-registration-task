import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import { icon_empty } from '../../../settings/helpers/constants';
import { INoRecToShowComponentProps } from './interface';
import History from '../../../settings/helpers/History';

class NoRecToShowComponent extends PureComponent<INoRecToShowComponentProps> {
	render() {
		const { name, link } = this.props;
		return (
			<div className={'no-result-block'}>
				<div className='empty-ico'>
					<img alt='Icon_Empty.svg' width='200' src={icon_empty} />
				</div>
				<h5>No {name} added yet.</h5>
				<div className='pt-3'></div>
				<div className='no-student-data'>
					<Button
						type='button'
						variant='link'
						className='mr-2 btn-sm'
						onClick={() => {
							History.push(link);
						}}
					>
						<i className='fas fa-plus'></i>&nbsp; Add {name}
					</Button>
				</div>
			</div>
		);
	}
}

export default NoRecToShowComponent;
