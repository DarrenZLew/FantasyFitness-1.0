import React from 'react';
import { Button, Modal, Input, Row } from 'react-materialize';
import Calculator from './Calculator';
import NumericInput from 'react-numeric-input';
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
								<Input type="number" label="Option 1" s={12} />
								<NumericInput className="Option 2" min={0} max={9999} />
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