import * as React from 'react';
import {
  Typography,
  Box,
  CardContent,
  Card,
  Grid,
  Divider,
  Paper,
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
  // height: 0.2,
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '90%',
  maxHeight: '90%',
});

export default function LeaderBoardItem(props) {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Paper sx={{ height: '15rem' }}>
          <Grid container sx={{ height: 'inherit' }}>
            <Grid
              xs
              item
              // sx={{ display: 'flex' }}
              // direction="column"
              // justifyContent="space-around"
              // alignItems="center"
            >
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                {props.rank < 3 && (
                  <Img
                    src={`/icons/rank${props.rank}.png`}
                    alt="Ranking medal"
                    // sx={{ width: '25%', height: '25%' }}
                  />
                )}
              </Grid>
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Typography gutterBottom variant="h4">
                  #{props.rank}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid
              xs={6}
              item
              // sx={{ display: 'flex' }}
              // direction="column"
              // justifyContent="space-around"
              // alignItems="center"
            >
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Typography gutterBottom variant="h4">
                  {props.userData.name}
                </Typography>
              </Grid>
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Img
                  sx={{ width: '50%', height: '50%' }}
                  src={props.userData.avatar}
                  alt="user avatar"
                />
              </Grid>
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Typography variant="h5" color="text.secondary">
                  total score
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid
              xs
              item
              // sx={{ display: 'flex' }}
              // direction="column"
              // justifyContent="space-around"
              // alignItems="center"
            >
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Typography variant="h6" color="text.secondary">
                  questions
                </Typography>
              </Grid>
              <Grid
                item
                // sx={{ display: 'flex' }}
              >
                <Typography variant="h6" color="text.secondary">
                  answers
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Root>
    </ThemeProvider>
  );
}
