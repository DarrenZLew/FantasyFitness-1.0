import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Grid, Segment, Image, Container, Table, Header } from 'semantic-ui-react';

const ExerciseTable = (props) => {
  const { exercises } = props;
  const rows = exercises.map((ex, index) => {
    const { name, value, score } = ex;
    return (
      <Table.Row key={index}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{value}</Table.Cell>
        <Table.Cell>{score}</Table.Cell>
      </Table.Row>
    )
  });  

  return (
    <Table basic='very' celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Excercises</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  )
}

const HeadToHeadCard = (props) => {  
  const { userA, userB } = props;
  const calculateTotal = (user) => {
    let score = 0;
    user.exercises.forEach((exercise) => {
      score += exercise.score;
    });
    return score;
  }
  let totalScoreA = calculateTotal(userA);
  let totalScoreB = calculateTotal(userB);
  return (
    <Card fluid>
      <Card.Content>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column verticalAlign='middle' width={5}>
              <Segment textAlign='right' vertical><strong>{userA.name}</strong></Segment>
              <Segment textAlign='right' vertical><strong>{totalScoreA}</strong></Segment>
            </Grid.Column>
            <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
              {/* TODO: replace image with user image */}
              <Image shape='circular' fluid src='https://react.semantic-ui.com/assets/images/wireframe/image.png'/>
            </Grid.Column>

            <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
              {/* TODO: replace image with user image */}
              <Image shape='circular' fluid src='https://react.semantic-ui.com/assets/images/wireframe/image.png'/>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='left' width={5}>
              <Segment vertical><strong>{userB.name}</strong></Segment>
              <Segment vertical><strong>{totalScoreB}</strong></Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>

            <Grid.Column width={8}>
              <ExerciseTable exercises={userA.exercises}/>
            </Grid.Column>

            <Grid.Column width={8}>
              <ExerciseTable exercises={userB.exercises}/>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

HeadToHeadCard.propTypes = {
  userA: PropTypes.shape({
    exercises: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      score: PropTypes.number,
    })),
    image: PropTypes.string,
    name: PropTypes.string,
  }),
  userB: PropTypes.shape({
    exercises: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      score: PropTypes.number,
    })),
    image: PropTypes.string,
    name: PropTypes.string, 
  }),
};

class HeadToHead extends React.Component {
  
  renderOtherMatchups = () => {
    const matchupsToRender = [];
    this.props.matchups.filter((matchup) => {
      return (matchup.userA.name !== this.props.user && matchup.userB.name !== this.props.user);
    }).forEach((matchup, index) => {
      matchupsToRender.push(
        <Grid.Column key={index} width={8}>
          <HeadToHeadCard userA={matchup.userA} userB={matchup.userB}/>
        </Grid.Column>
      )
    });
    return matchupsToRender;
  }

  render() {
    let self, opponent;
    for (let i = 0; i < this.props.matchups.length; i++) {
      const matchup = this.props.matchups[i];
      if (matchup.userA.name === this.props.user) {
        self = matchup.userA;
        opponent = matchup.userB;
      }
      else if (matchup.userB.name === this.props.user) {
        self = matchup.userB;
        opponent = matchup.userA;
      }
    }

    return (
      <Container textAlign='center'>
        <HeadToHeadCard userA={self} userB={opponent}/>
        <Header>Other Matchups This Week</Header>
        <Grid relaxed columns={2}>
          {this.renderOtherMatchups()}
        </Grid>
      </Container>
    )
  }
}

HeadToHead.propTypes = {
  user: PropTypes.string,
  matchups: PropTypes.arrayOf(
    PropTypes.shape({
      userA: PropTypes.object,
      userB: PropTypes.object,
    })
  ),
}

const mapStateToProps = (state) => {
  return { ...state.headToHead };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadToHead);