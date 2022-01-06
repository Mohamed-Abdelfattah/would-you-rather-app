import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { fetchAndPopulateUsers } from '../API/InteractionsThunkMiddleware';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { usersActions } from '../features/users/users-slice';
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CssBaseline,
  Button,
  Avatar,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#008080',
    },
    secondary: {
      main: '#26c3c7',
    },
  },
});

function TransitionAlerts(props) {
  //
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          You can't continue without being logged in! Please Sign in below!
        </Alert>
      </Collapse>
    </Box>
  );
}

export default function LoginPage() {
  //
  const [optionWasSelected, setOptionWasSelected] = React.useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const status = useSelector((state) => state.status);
  console.log(users);
  const history = useHistory();

  React.useEffect(() => {
    if (users.wasPopulatedBefore) return;
    dispatch(fetchAndPopulateUsers());
  }, []);

  // React.useEffect(() => {
  //   console.log(
  //     'at useEffect to check redirecting and active',
  //     users.activeUser
  //   );
  //   if (users.activeUser) {
  //     console.log('at if statement and active:', users.activeUser);
  //     history.push('/home');
  //   }
  // }, [users.activeUser, history]);

  const handleChange = (event) => {
    // console.log(event.currentTarget);
    setOptionWasSelected(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log('user:', data.get('user'), typeof data.get('user'));
    dispatch(usersActions.login(data.get('user')));
    history.push('/home');
  };

  if (status.pending)
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (status.error) {
    return (
      <React.Fragment>
        <h2>OOPS!!</h2>
        <h4>there was an error</h4>
        <p>{status.error}</p>
      </React.Fragment>
    );
  }

  if (status.success)
    return (
      <ThemeProvider theme={theme}>
        <TransitionAlerts />
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: '#008080' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Choose your account from below
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl
                fullWidth
                sx={{ minWidth: { xs: 200, sm: 250, md: 300 } }}
              >
                <InputLabel id="user-label">User Name</InputLabel>
                <Select
                  labelId="user-label"
                  id="user"
                  name="user"
                  value={undefined}
                  label="user-name"
                  onChange={handleChange}
                >
                  {Object.entries(users.usersDict).map((el) => (
                    <MenuItem key={el[0]} value={el[0]}>
                      {el[1].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                disabled={!optionWasSelected}
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );

  return <h2>OOPS!! SOMTHING WENT WRONG!!</h2>;
}
