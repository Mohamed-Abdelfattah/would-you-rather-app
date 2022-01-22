import * as React from 'react';
import { Typography } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  styled,
} from '@mui/material/styles';
import classes from './LeaderBoardItem.module.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '60%',
  maxHeight: '75%',
});

export default function LeaderBoardItem(props) {
  return (
    <ThemeProvider theme={theme}>
      <div className={`${classes.grid} `}>
        <div className={`${classes.rank} `}>
          {props.rank < 3 && (
            <div>
              <Img src={`/icons/rank${props.rank}.png`} alt="Ranking medal" />
            </div>
          )}
          <div>
            <Typography gutterBottom variant="h4">
              #{props.rank}
            </Typography>
          </div>
        </div>
        <hr className={classes.vertical} />
        <div className={`${classes.user} `}>
          <Typography variant="h4" component="div">
            {props.userData.name}
          </Typography>
          <Img
            sx={{ maxWidth: '100%', maxHeight: '100%' }}
            src={props.userData.avatar}
            alt="user avatar"
          />
          <div>
            <Typography
              gutterBottom
              variant="h5"
              color="text.secondary"
              component="div"
            >
              Total Score:&nbsp;
              <Typography component="span" variant="h4" color="orangered">
                {props.userData.totalScore}
              </Typography>
            </Typography>
          </div>
        </div>
        <hr className={classes.vertical} />
        <div className={`${classes.score} `}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Answered questions:&nbsp;
            <Typography component="span" variant="h6" color="orangered">
              {props.userData.answersScore}
            </Typography>
          </Typography>
          <div>
            <hr />
          </div>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Created questions:&nbsp;
            <Typography component="span" variant="h6" color="orangered">
              {props.userData.questionsScore}
            </Typography>
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}
