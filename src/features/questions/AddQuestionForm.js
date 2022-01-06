import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  TextField,
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

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const AddQuestionForm = (props) => {
  //
  const user = useSelector((state) => state.users.activeUser);
  const optionOneInputRef = useRef();
  const optionTwoInputRef = useRef();

  const sumbmitHandler = (event) => {
    //
    event.preventDefault();

    props.onSubmitQuestion({
      optionOneText: optionOneInputRef.current.value,
      optionTwoText: optionTwoInputRef.current.value,
      author: user.id,
    });
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            flexGrow: 1,
          }}
          elevation={3}
        >
          <form onSubmit={sumbmitHandler}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-around"
            >
              <Grid item xs={8} m={2}>
                <Root>
                  <Box>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      label="Would You Rather ..."
                      id="opt1"
                      required
                      helperText="Please type in the first poll question"
                      inputRef={optionOneInputRef}
                    />
                  </Box>
                  <Divider>
                    <Chip label="OR" />
                  </Divider>
                  <Box>
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      label="Would You Rather ..."
                      id="opt2"
                      required
                      helperText="Please type in the second poll question"
                      inputRef={optionTwoInputRef}
                    />
                  </Box>
                </Root>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid
                xs
                spacing={5}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Grid item>
                  <Typography variant="subtitle1" color="text.secondary">
                    Add Question
                  </Typography>
                </Grid>
                <Grid item>
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </ThemeProvider>
    </Fragment>
  );
};

export default AddQuestionForm;
