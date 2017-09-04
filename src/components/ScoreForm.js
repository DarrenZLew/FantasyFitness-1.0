import React from 'react';
import { Button, Modal, Input, Row } from 'react-materialize';
import Calculator from './Calculator';
const ScoreForm = () => {
	const exercises = ['Push Ups', 'Pull Ups', 'Running', 'Cycling']
	return (
		<form>
			{exercises.map((exercise) => {
				return (
					<div>
						<Modal
							header={exercise}
							trigger={<Button>{exercise}</Button>}>
							<p>Calculator goes here for scoring</p>
							<Row>
								<Input placeholder="Placeholder" s={6} label="First Name" />
								<Input s={6} label="Last Name" />
								<Input s={12} label="disabled" defaultValue="I am not editable" disabled />
								<Input type="password" label="password" s={12} />
								<Input type="email" label="Email" s={12} />
							</Row>
						</Modal>
						<p>{exercise}: ###</p>	
					</div>
				)
			})}	
		</form>
	)
}

export default ScoreForm