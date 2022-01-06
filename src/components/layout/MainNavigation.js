import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import {
  MenuItem,
  Tooltip,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Box,
} from '@mui/material';
import { usersActions } from '../../features/users/users-slice';

const MainNavigation = () => {
  //
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.users.activeUser);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(usersActions.logout());
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#008080',
        height: '5rem',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              // mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontSize: { sm: '1.5rem', md: '1.75rem' },
            }}
          >
            Would You Rather...
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <nav className={classes.nav}>
                <ul>
                  <li>
                    <NavLink
                      to="/home"
                      activeClassName={classes.active}
                      className={classes.burger}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/add"
                      activeClassName={classes.active}
                      className={classes.burger}
                    >
                      New Question
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/leader-board"
                      activeClassName={classes.active}
                      className={classes.burger}
                    >
                      Leader Board
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
              height: '2rem',
              fontSize: '1.5rem',
            }}
          >
            Would You Rather...
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: { sm: 'center', md: 'space-evenly' },
              // fontSize: '1.75rem',
            }}
          >
            <nav className={classes.nav}>
              <ul>
                <li>
                  <NavLink to="/home" activeClassName={classes.active}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/add" activeClassName={classes.active}>
                    New Question
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/leader-board" activeClassName={classes.active}>
                    Leader Board
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Box>
          {user && (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <MenuItem disabled>Hi, {user.name.split(' ')[0]}</MenuItem>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.avatarURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={logoutHandler} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainNavigation;
