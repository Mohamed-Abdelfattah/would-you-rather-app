import { Box } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import LeaderBoardItem from '../features/users/LeaderBoardItem';

const LeaderBoard = (props) => {
  //
  const users = useSelector((state) => state.users.usersDict);

  console.log(users);

  const ranking = [];
  for (const [id, user] of Object.entries(users)) {
    ranking.push({
      id,
      name: user.name,
      avatar: user.avatarURL,
      answersScore: Object.keys(user.answers).length,
      questionsScore: user.questions.length,
      totalScore: Object.keys(user.answers).length + user.questions.length,
    });
  }

  ranking.sort((a, b) => b.totalScore - a.totalScore);

  return (
    <Fragment>
      <h2>Leader Board Page</h2>
      {ranking.length > 0 &&
        ranking.map((user, index) => (
          <div>
            <Box sx={{ height: '15rem' }}>
              <LeaderBoardItem key={user.id} rank={index + 1} userData={user} />
            </Box>
            <p>Name: {user.name}</p>
            <p>Total Score: {user.totalScore}</p>
            <p>Questions: {user.questionsScore}</p>
            <p>Answeres: {user.answersScore}</p>
            <hr />
          </div>
        ))}
    </Fragment>
  );
};

export default LeaderBoard;
