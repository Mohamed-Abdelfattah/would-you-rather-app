import React, { useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  CardActionArea,
  Divider,
  Chip,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  styled,
} from '@mui/material/styles';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ChartBar from '../components/UI/Chart/ChartBar';
import {
  fetchQuetionById,
  questionGotAnswered,
} from '../API/InteractionsThunkMiddleware';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const QuestionDetailsPage = (props) => {
  //
  const questions = useSelector((state) => state.questions);
  const status = useSelector((state) => state.status);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  let q = questions.questionsList.find((el) => el.id === params.id);
  let userAnsweredQuestionWith = users.activeUser.answers[q.id] || null;

  useEffect(() => {
    //
    dispatch(fetchQuetionById(params.id));
  }, []);

  const percentage = {
    opt1: { number: 0, text: '' },
    opt2: { number: 0, text: '' },
  };
  if (questions.activeQuestion) {
    const total =
      questions.activeQuestion.optionOne.votes.length +
      questions.activeQuestion.optionTwo.votes.length;
    percentage.opt1.number =
      (questions.activeQuestion.optionOne.votes.length * 100) / total;
    percentage.opt1.text = `${questions.activeQuestion.optionOne.votes.length} out of ${total} votes`;
    percentage.opt2.number =
      (questions.activeQuestion.optionTwo.votes.length * 100) / total;
    percentage.opt2.text = `${questions.activeQuestion.optionTwo.votes.length} out of ${total} votes`;
  }

  const chooseOptionOneHandler = () => {
    dispatch(
      questionGotAnswered(
        questions.activeQuestion.id,
        users.activeUser.id,
        'optionOne'
      )
    );
  };

  const chooseOptionTwoHandler = () => {
    dispatch(
      questionGotAnswered(
        questions.activeQuestion.id,
        users.activeUser.id,
        'optionTwo'
      )
    );
  };

  if (status.pending) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status.error) {
    return (
      <Fragment>
        <h2>OOOPPS!</h2>
        <h3>{status.error}</h3>
      </Fragment>
    );
  }

  if (status.success && questions.activeQuestion) {
    return (
      // <Fragment>
      <ThemeProvider theme={theme}>
        {!userAnsweredQuestionWith && (
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              flexGrow: 1,
              // width: { md: '120%' },
            }}
            elevation={3}
          >
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-around"
            >
              <Grid item xs={8} mr={2}>
                <Root>
                  <CardActionArea onClick={chooseOptionOneHandler}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={9} p={2}>
                        <Typography gutterBottom variant="h4">
                          {questions.activeQuestion.optionOne.text}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Img
                          alt="complex"
                          src="/icons/push-button.png"
                          sx={{
                            width: { xs: 50, sm: 80, md: 100 },
                            height: { xs: 50, sm: 80, md: 100 },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardActionArea>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <CardActionArea onClick={chooseOptionTwoHandler}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={9} p={2}>
                        <Typography gutterBottom variant="h4">
                          {questions.activeQuestion.optionTwo.text}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Img
                          alt="complex"
                          src="/icons/push-button.png"
                          sx={{
                            width: { xs: 50, sm: 80, md: 100 },
                            height: { xs: 50, sm: 80, md: 100 },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Root>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid
                xs
                item
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                textAlign="center"
              >
                <Grid item xs={2}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Asked by:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Img
                    alt={users.usersDict[questions.activeQuestion.author].name}
                    src={
                      users.usersDict[questions.activeQuestion.author].avatarURL
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography gutterBottom variant="h6" component="div">
                    {users.usersDict[questions.activeQuestion.author].name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
        {userAnsweredQuestionWith && (
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              flexGrow: 1,
              // width: { md: '120%' },
            }}
            elevation={3}
          >
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-around"
            >
              <Grid item xs={8} mr={2}>
                <Root>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    className={
                      userAnsweredQuestionWith === 'optionOne' ? 'choice' : ''
                    }
                  >
                    <Grid item xs={9}>
                      <Grid container spacing={2} direction="column">
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="h4" pl={2}>
                            {questions.activeQuestion.optionOne.text}
                          </Typography>
                        </Grid>
                        <Grid xs={2}></Grid>
                        <Grid item xs={4}>
                          <Box sx={{ flexGrow: 1 }}>
                            <ChartBar value={percentage.opt1.number} />
                          </Box>
                          <Typography variant="h6" textAlign="center">
                            {percentage.opt1.text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      {userAnsweredQuestionWith === 'optionOne' && (
                        <Grid
                          container
                          spacing={2}
                          direction="column"
                          alignContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item xs={8}>
                            <Img
                              alt="ribbon image to visually mark the user selection"
                              src="/icons/premium-quality.png"
                              sx={{
                                width: { xs: 50, sm: 80, md: 100 },
                                height: { xs: 50, sm: 80, md: 100 },
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              variant="h6"
                              color="#e9b021"
                            >
                              Your Choice
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    className={
                      userAnsweredQuestionWith === 'optionTwo' ? 'choice' : ''
                    }
                  >
                    <Grid item xs={9}>
                      <Grid container spacing={2} direction="column">
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="h4" pl={2}>
                            {questions.activeQuestion.optionTwo.text}
                          </Typography>
                        </Grid>
                        <Grid xs={2}></Grid>
                        <Grid item xs={4}>
                          <Box sx={{ flexGrow: 1 }}>
                            <ChartBar value={percentage.opt2.number} />
                          </Box>
                          <Typography variant="h6" textAlign="center">
                            {percentage.opt2.text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      {userAnsweredQuestionWith === 'optionTwo' && (
                        <Grid
                          container
                          spacing={2}
                          direction="column"
                          alignContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item xs={8}>
                            <Img
                              alt="ribbon image to visually mark the user selection"
                              src="/icons/premium-quality.png"
                              sx={{
                                width: { xs: 50, sm: 80, md: 100 },
                                height: { xs: 50, sm: 80, md: 100 },
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              variant="h6"
                              color="#e9b021"
                            >
                              Your Choice
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Root>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid
                xs
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                textAlign="center"
              >
                <Grid item>
                  <Typography variant="subtitle1" color="text.secondary">
                    Asked by:
                  </Typography>
                </Grid>
                <Grid item>
                  <Img
                    alt={users.usersDict[questions.activeQuestion.author].name}
                    src={
                      users.usersDict[questions.activeQuestion.author].avatarURL
                    }
                  />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="div">
                    {users.usersDict[questions.activeQuestion.author].name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}

        <button onClick={history.goBack} className="centered--btn">
          Back
        </button>
      </ThemeProvider>
      // </Fragment>
    );
  }

  return <h2>OOPS! something went wrong!</h2>;
};

export default QuestionDetailsPage;
