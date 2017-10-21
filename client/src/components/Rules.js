import React from 'react';
import { Container, Divider, List, Header } from 'semantic-ui-react';

const Games = () => {
	return (
		<div>
			<Header as='h2'>Games</Header>
			<p>Each week you will be pitted against another player. There is no draft or substituting; you play for yourself and you play to win. Games run from Sunday morning to Saturday night. Sunday will be a buffer day where you will be able to record your score for the previous week until downtime on Sundays from 4 P.M. to midnight (or whenever I send the e-mail saying I’m done) where I will be tallying scores and other maintenance. You can earn points on Sunday, even if your opponent hasn’t been revealed yet, but it will be for the following week and you will have to wait until I activate the form again. You’ll be adding your movement counts/activity hours to a google form where the calculations will be done for you and displayed on a read only scoreboard spreadsheet. It is !!!HIGHLY!!! suggested that you log your workouts daily instead of trying to do it all on Sunday. It is considered POOR SPIRIT to intentionally hold off on scoring points so that your opponent doesn’t know how many points you’ve scored. If you can’t remember how you scored on something, then you should forfeit those points instead of guessing. </p>
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
			<Header as='h2'>Rewards/Compensations/Penalties</Header>
			<p>There are no prizes or punishments for participating in this. I don’t feel like handling people’s money for this nor do I want to tempt people to cheat since this is such an honor based competition. I have no idea how I would enforce any punishments anyhow.</p>
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
		Distances can be calculated to the decimal point if you so desire. (i.e. If you run for 2.6 miles, you earn 2600 points.)
		Discrete movements can be accumulated throughout the day. (i.e. every time you go to the bathroom, do 10 push ups (Also known as “piss ups”))
	</p>
			<p>Push Ups: 10 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Chest to ground push ups. At the very least, your shirt (or chest hair) should make contact. If you must go to your knees for a push up, then it counts at ⅓ the rate.</List.Item>	
			</List>
			<p>Handstand Push Ups/Pull Ups: 50 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Handstand push ups may be done with a wall for balance or free standing if you have the balance for it. </List.Item>
				<List.Item as='li' value='-'>“Kipping” HPU/PUs are worth ⅓ the value. (i.e. 6 pull ups + 2 kipping pull ups = [6 + 3* ⅓]*50 = [6+.6]*50 = 6.6*50 = 330 points) </List.Item>
			</List>
			<p>Air Squats: 5 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>Hip crease below knee crease</List.Item>
			</List>
			<p>Miles Ran: 1000 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Treadmill is useful since it will tell you how far you ran. Otherwise, use a route tracking app or fitbit-like technology to track distance ran.</List.Item>
				<List.Item as='li' value='-'>You don’t necessarily have to be “running” the entire time, if you walk part of your route, that’s fine. You don’t get to count the steps you take walking around the office.</List.Item>
				<List.Item as='li' value='-'>No bonuses awarded for inclined running, trail running or otherwise. Highly encouraged to do so anyway for bragging rights.</List.Item>
				<List.Item as='li' value='-'>Cross-country skiing and other variations fall under this category as well. Downhill skiing does not.</List.Item>
			</List>
			<p>Miles Swam: 3500 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Figure out the length of your pool and determine how far you swam based on laps.</List.Item>
			</List>
			<p>Miles Biked: 400 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Stationary bike counts. No bonuses are applied for using resistance. </List.Item>
				<List.Item as='li' value='-'>Track using a route tracking app to figure out distances if not using a stationary, don’t just estimate it.</List.Item>
				<List.Item as='li' value='-'>Commuting/transportation counts. You don’t have to keep tracking the route if you do the same route frequently (i.e. commuting to work from home or going to your favorite bar from your home). </List.Item>
				<List.Item as='li' value='-'>Use common sense and have good spirit with this one guys.</List.Item>
			</List>
			<p>Kilometers Rowed: 400 Points Each</p>		
			<List as='ol'>
				<List.Item as='li' value='-'>Use a rowing machine to track distance. I have no idea how to calculate in-water rowing.</List.Item>
				<List.Item as='li' value='-'>Don’t question why this one is using the metric system.</List.Item>
			</List>
			<Divider hidden />
		</div>
	)
}

const Activities = () => {
	return (
		<div>
			<Header as='h3'>Activities</Header>
			<p>This is meant to encompass what cannot be discretely measured. No double counting; you can’t accumulate points from your movements and your activities simultaneously. (i.e. if you do a spin class, you can either get the points per hour of class, OR by distance biked, but not both. If you do a bunch of push ups/pull ups for crossfit, you can’t add those to your daily count). You are likely to earn more points at the hourly rate than you are at the discrete counting rate. This is likely where you will earn the majority of your points.Be reasonable and have good spirit here. Most training regimens are based on an hour long session. If you take 90 minutes because you’re gabbing with your lifting buddy, you should only count it as 1 hour. Alternatively, if you beast mode your way through the workout and complete it in 45 minutes, you can still count it as an hour. If the lifting regimen is supposed to take 90 minutes, then go ahead and enter it as 1.5 hours. Basically, count it based on your program’s suggested time. If you’re making it up yourself, be fair.</p>
			<p>High intensity exercise: 7000 Points Each Hour</p>
			<List as='ol'>
				<List.Item as='li' value='-'>This is meant to encapsulate things that are high cardio exercises like circuit classes, crossfit, spin class, sprint classes (is that a thing?), high intensity interval training, core exercises.</List.Item>
			</List>
			<p>Low Intensity exercise: 5000 Points Each Hour</p>
			<List as='ol'>
				<List.Item as='li' value='-'>This is meant to encapsulate things that are low cardio exercises like weightlifting and yoga.</List.Item>
				<List.Item as='li' value='-'>Some yoga classes are labeled along the lines of “Power Up” and are actually more like a high intensity circuit or fitness class. Feel free to count them as such instead. Use discretion wisely.</List.Item>
				<List.Item as='li' value='-'>Please ask me clarifying questions about this if you need to. I feel like it’s pretty self-explanatory but I may be wrong.</List.Item>
			</List>
			<p>Hours general sporting: 3500 Points Each</p>
			<List as='ol'>
				<List.Item as='li' value='-'>If you are playing a sport (indoor ultimate, goalti, indoor soccer) or anything that doesn’t fit into the previously mentioned categories then you should count it by the hours played (to the quarter hour if possible). </List.Item>
				<List.Item as='li' value='-'>The point value is low because you will likely spend much time on the sideline and this is also not “focused” exercise either; you gain more from 20 minutes of intense conditioning than an hour of play.</List.Item>
				<List.Item as='li' value='-'>If it’s something that has a set time (like a soccer game) count it by how long the game was: two 45 minutes halves means you played for 90 minutes/1.5 hours.</List.Item>
				<List.Item as='li' value='-'>If it’s something that plays until you finish, be reasonable and make your best guess for how long you played.</List.Item>
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
				<List.Item as='li' value='-'>Tabata challenges consist of 8 rounds of 20 seconds on and 10 seconds recovery.</List.Item>
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
				<List.Item as='li' value='-'>If yoga is part of your workout that day, then you can count this bonus for the day without spending an extra 10 minutes stretching just to earn the bonus.</List.Item>
			</List>
			<p>Head-to-head Challenges: 5000 points</p>
			<List as='ol'> 
				<List.Item as='li' value='-'>Each week there will be a different challenge against your opponent. These will be explained each week.</List.Item>
				<List.Item as='li' value='-'>Examples: Most push ups, most miles ran, most spiderman push ups etc.</List.Item>
				<List.Item as='li' value='-'>These will be added manually during the downtime period when I’m doing weekly maintenance.</List.Item>
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
			<Games />
			<Matchups />
			<Rewards />
			<Scoring />
			<Appendix />
		</Container>
	)
}

export default Rules;