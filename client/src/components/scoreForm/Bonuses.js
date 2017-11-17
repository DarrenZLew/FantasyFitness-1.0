import React from 'react';
import { Table, Icon, Popup, Button, Grid, Sidebar, Segment } from 'semantic-ui-react';
import { Field } from 'redux-form';

const Bonuses = ({ bonuses, double, handleSubmit }) => (
	<Grid>
		<Grid.Row only='mobile tablet' stretched>
			<Grid.Column>
				{bonuses.map((bonus, index) => {
					// const detailsVisible = activeIndexDetails === index ? true : false					
					const { name, value, points } = {...bonus}
					let [submitColor, iconName] = value === true ? ['green', 'thumbs up'] : ['red', 'thumbs down']

					return (
						<Sidebar.Pushable 
							as={Segment} 
							key={name} 
							style={{boxShadow: '2px 2px 5px 3px rgba(34,36,38,.15)', border: 'none'}}
						>
							<Sidebar 
								as={Button} 
								type='button' 
								onClick={() => handleSubmit(index)} 
								animation='overlay' 
								direction='right'
								style={{width: '100px'}} 
								visible={true}
								color={submitColor}
							> 
								<Icon name={iconName} size='large' />
							</Sidebar>
							<Sidebar.Pusher>
								<Segment style={{height: '100px'}} >
									<div style={{padding: '10px', fontSize: '1.3em'}}>
										{name}
									</div>
									<div style={{padding: '10px'}}>
										Points: {points}
									</div>
		        		</Segment>
		        	</Sidebar.Pusher>
		        </Sidebar.Pushable>
					)						
				})}
			</Grid.Column>
		</Grid.Row>

		<Grid.Row only='computer'>
			<Grid.Column>
				<Table selectable size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								Daily Bonuses
								<Popup
			      			trigger={<Icon name='info circle'/>}
						      content='Click on the bonus to learn more!'
						      hideOnScroll
			    			/>
							</Table.HeaderCell>
							<Table.HeaderCell>
								Points
							</Table.HeaderCell>
							<Table.HeaderCell>
								Completed?
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{bonuses.map((bonus,index) => {
							let bonusComplete = bonus.value === true ? 
								<Button type='button' onClick={() => handleSubmit(index)} color='green'>
									<Icon name='thumbs up' />
								</Button> 
								: 
								<Button type='button' onClick={() => handleSubmit(index)} color='red'>
									<Icon name='thumbs down' />
								</Button> 
							return (
								<Table.Row key={bonus.name}>
									<Table.Cell> 
										{bonus.name}
									</Table.Cell>
									<Table.Cell>
										{bonus.points}
									</Table.Cell>
									<Table.Cell>
										{bonusComplete}
									</Table.Cell>
								</Table.Row>)
							})
					}
					</Table.Body>
				</Table>
			</Grid.Column>
		</Grid.Row>
	</Grid>
)

export default Bonuses