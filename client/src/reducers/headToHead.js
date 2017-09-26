const initialState = {
  user: 'Sanda',
  matchups: [
    {
      userA: {
        name: 'Sanda',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 100,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 500,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 900,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 350,
          }
        ],
      },
      userB: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 100,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 200,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 300,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 400,
          }
        ],
      },
    },

    {
      userA: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: '100',
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: '500',
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: '900',
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: '350',
          }
        ],
      },
      userB: {
        name: 'Darren',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 500,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 600,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 700,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 900,
          }
        ],
      },
    },

    {
      userA: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
      userB: {
        name: 'Daren',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
    },

    {
      userA: {
        name: 'Darren',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
      userB: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
    },

    {
      userA: {
        name: 'Darren',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
      userB: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 125,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 125,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 125,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 125,
          }
        ],
      },
    },

    {
      userA: {
        name: 'Darren',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 310,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 310,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 310,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 310,
          }
        ],
      },
      userB: {
        name: 'Ryan',
        exercises: [
          {
            exercise: 'Pull-ups',
            amount: '3000',
            score: 310,
          },
          {
            exercise: 'Running',
            amount: '10000',
            score: 310,
          },
          {
            exercise: 'Climbing',
            amount: 'v4, v5, v6',
            score: 310,
          },
          {
            exercise: 'Deadlift ',
            amount: '225',
            score: 310,
          }
        ],
      },
    },
  ]
}

export default (state = initialState, action) => {
  return state;
}