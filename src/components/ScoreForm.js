import React from 'react';
import { Button, Modal } from 'react-materialize';
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
						</Modal>
						<p>{exercise}: ###</p>	
					</div>
				)
			})}	
		</form>
	)
}

export default ScoreForm