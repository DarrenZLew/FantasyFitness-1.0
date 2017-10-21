import React from 'react';
import { Container, Divider, List, Header } from 'semantic-ui-react';

const DefineFF = () => {
	return (
		<div>
			<Header as='h2'> What is Fantasy Fitness? </Header>
			<p>Staying fit in the winter is hard. Especially in North. But we want to do fun stuff in the spring.</p>
			<p>We created Fantasy Fitness as a means to meet this problem as a collective. We all have different wants. Some want to get stronger. Some want to prevent injuries. Some want to win. Let's all do our best.</p> 
			<Divider hidden/>
		</div>
	)
}

const Games = () => {
	return (
		<div>
			<Header as='h2'>Games</Header>
			<p>Each week you will be pitted against another player. There is no draft or substituting; you play for yourself and you play to win. Games run from Sunday morning to Saturday night. Sunday will be a buffer day where you will be able to record your score for the previous week. At 8 P.M. the previous week comes to a close and the next week begins. No exceptions. You can check in at 8 P.M. to see the finals scores for the previous week. Hold off on adding your new numbers for the current week until the previous week has been tallied.</p> 
			<p>Like the app? Sweet! The best thing you can do to make it fun for others is to keep your score current. It's way more fun to know how your opponent is doing. Don't score late.</p>
			<Divider hidden />
		</div>
	)
}

const Matchups = () => {
	return (
		<div>
			<Header as='h2'>Match Ups</Header>
			<p>We will be running with a normal league play for simplicity sake. Future iterations of this may include more sophisticated match ups. </p>
			<Divider hidden />		
		</div>
	)
}

const Rewards = () => {
	return (
		<div>
			<Header as='h2'>Reward</Header>
			<p>There won't be a prize at the end, but hopefully you can go into the Spring strong. Celebrate your successes, cheer others on, don't get hurt.</p>
			<Divider hidden />		
		</div>
	)
}

const Scoring = () => {
	return (
		<div>
			<Header as='h2'>Scoring</Header>
			<IndividualMovements />
			<Activities />
			<Bonuses />
		</div>
	)
}

const IndividualMovements = () => {
	return (
		<div>
			<Header as='h3'>Individual Movements</Header>
			<p>These should help you pad your score for some quick points. While you can create your own workout routine based on these movements, you will likely find that points can be earned faster through other means. 
		Distances can be calculated to the decimal point.
	</p>
			<p>Push-Ups: 10 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Chest to ground push ups. Back straight. Your shirt should make contact. If you must go to your knees for a push up, then it counts at ⅓ the rate.</List.Item>	
			</List>
			<p>Handstand Push Ups/Pull Ups: 50 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Handstand push ups may be done with a wall for balance. If you can do them freestanding you're amazing. </List.Item>
				<List.Item as='li' value='-'>“Kipping” HPU/PUs are worth ⅓ the value. </List.Item>
			</List>
			<p>Air Squats: 5 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Hip crease below knee crease</List.Item>
			</List>
			<p>Miles Ran: 1000 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Treadmill is useful since it will tell you how far you ran. Otherwise, use a route tracking app or fitbit-like technology to track distance ran.</List.Item>
				<List.Item as='li' value='-'>Running with walking is fine. Count the total distance.</List.Item>
				<List.Item as='li' value='-'>Steps taken walking around the office or at your job do not count.</List.Item>
				<List.Item as='li' value='-'>No bonuses awarded for inclined running, trail running or otherwise. Highly encouraged to do so anyway for bragging rights.</List.Item>
				<List.Item as='li' value='-'>Cross-country skiing and other variations fall under this category as well. Downhill skiing does not.</List.Item>
				<List.Item as='li' value='-'>Commuting counts.</List.Item>
			</List>
			<p>Miles Swam: 3500 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Figure out the length of your pool and determine how far you swam based on laps.</List.Item>
			</List>
			<p>Miles Biked: 400 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Stationary bike counts. No bonuses are applied for using resistance. </List.Item>
				<List.Item as='li' value='-'>Track using a route tracking app to figure out distances if not using a stationary, avoid estimating distance.</List.Item>
				<List.Item as='li' value='-'>Commuting/transportation counts. </List.Item>
			</List>
			<p>Kilometers Rowed: 400 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Use a rowing machine to track distance.</List.Item>
			</List>
			<Divider hidden />
		</div>
	)
}

const Activities = () => {
	return (
		<div>
			<Header as='h3'>Activities</Header>
			<p>This is meant to encompass what cannot be discretely measured. No double counting of activities and movements. Time spent socializing without activity does not count in this time. Use your best judgement when assigning score/time.</p>
			<p>High intensity exercise: 7000 Points Each Hour</p>
			<List as='ol'>
				<List.Item as='li' value='-'>High cardio exercises like circuit classes, crossfit, spin class, high intensity interval training, core exercises.</List.Item>
			</List>
			<p>Low Intensity exercise: 5000 Points Each Hour</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Low cardio exercises like weightlifting and yoga.</List.Item>
				<List.Item as='li' value='-'>Please ask clarifying questions to league organizers rather than making assumptions.</List.Item>
			</List>
			<p>Hours general sporting: 3500 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>For sports like ultimate, soccer, broomball, etc. Count it to the nearest quarter hour. </List.Item>
				<List.Item as='li' value='-'>Be reasonable and make your best guess for how long you played. Exclude true downtime.</List.Item>
				<List.Item as='li' value='-'>If you are bored on the sideline and feel like boosting your points, you are encouraged to do push ups. The double counting exclusion rule doesn’t apply here like it would in the other activity categories. </List.Item>
			</List>
			<Divider hidden />
		</div>
	)
}

const Bonuses = () => {
	return (
		<div>
			<Header as='h3'>Bonuses</Header>
			<p><a href="https://docs.google.com/document/d/1uEJovqycT35N2RyBuYhBo9Siv-ea1ISXGNYHVE_Xu68/edit" target="_blank">Tabata Challenges:</a> 1500 points per day</p>
			<List as='ol'>
				<List.Item as='li' value='-'>You can only complete the tabata challenge once per day. It is meant to be a good way to top off your exercise for the day since it only takes 4 minutes.</List.Item>
				<List.Item as='li' value='-'>Tabata challenges consist of 8 rounds of 20 seconds on and 10 seconds recovery. This should make you tired.</List.Item>
				<List.Item as='li' value='-'>Check out the Appendix for more information on movements (or come up with your own!)</List.Item>
			</List>
			<p><a href="https://docs.google.com/document/d/1LSzUkVwbQ_qUfRJEW-Ydw3zv3Fu2TjSI0qWcZ3miRGo/edit" target="_blank">Nutrition:</a> 1000 points per day</p>
			<List as='ol'>
				<List.Item as='li' value='-'>You can complete this once per day.</List.Item>
				<List.Item as='li' value='-'>There are four different nutrition challenges. These will be cycled throughout the season.</List.Item>
				<List.Item as='li' value='-'>Check out the nutrition link for details on each nutrition challenge.</List.Item>
			</List>
			<p>Stretching: 1000 points per day</p>
			<List as='ol'> 
				<List.Item as='li' value='-'>You can complete this once per day.</List.Item> 
				<List.Item as='li' value='-'>Generally you should try to do this after your workout.</List.Item> 
				<List.Item as='li' value='-'>You must stretch for at least 10 minutes to earn this bonus.</List.Item>
				<List.Item as='li' value='-'>If yoga is part of your workout that day, then you can count this bonus for the day.</List.Item>
			</List>
			<p>Head-to-head Challenges: 5000 points</p>
			<List as='ol'> 
				<List.Item as='li' value='-'>Each week there will be a different challenge against your assigned opponent. These will be explained each week.</List.Item>
				<List.Item as='li' value='-'>Sometimes these will require you to fill in data yourself (such as unusual movements like spider man push ups) and sometimes these will happen automatically based on other standard fields (such as push ups and miles ran).</List.Item>
			</List>
			<Divider hidden />
		</div>
	)
}

const Appendix = () => {
	return (
		<div>
			<Header as='h3'>
				<a href="https://docs.google.com/document/d/1BiAc9j5Vvm1S8aLaCyPtF-AiRr2dy9o_K6cpUDckfJk/edit#heading=h.p0cipd4wffze" target="_blank">
					Appendix
				</a>
			</Header>
			<Divider hidden />
		</div>
	)
}

const Rules = () => {
	return (
		<Container text>
			<DefineFF />
			<Games />
			<Matchups />
			<Rewards />
			<Scoring />
			<Appendix />
		</Container>
	)
}

export default Rules;