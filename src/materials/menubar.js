import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import User from '../username.js'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { mainListItems, secondaryListItems } from './listitems.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as Linky
  } from "react-router-dom";
import firebase from '../firebase.js';
import RegisterForm from '../Login/register.js';
import ViewMap from '../ViewMap/viewmap.js';
import Login from '../Login/login.js';
import BuildMapView from '../MapBuild/createmap.js';
import MainPage from '../mainPage.js';
import ListMaps from '../MapBuild/listMaps.js'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 1000,
    },
  }));

export default function Dashboard() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
    isLoggedIn();
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openZ = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
    isLoggedIn();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = () => {
    //let map = firebase.firestore().collection('users').doc(CurrentUserID);
    //console.log(map)

    var temp = firebase.auth().currentUser;
    if (temp) {
        //this.setState({ user });
        console.log("From navBar")
        console.log(temp);
        //this.props.sendUser(user);
        //this.setState({loggedIn:true});
        setLoggedIn(true);
        
    } else {
        setLoggedIn(false);
    }
        
    
  }
  const handleLogout= event => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    event.preventDefault();
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Social Compass
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenu}
            >
              <AccountCircle />
          </IconButton>
            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={openZ}
            onClose={handleClose}
            >
                {loggedIn==false
                ? <div>
                    <MenuItem onClick={handleClose} component="a" href="/login">Login</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="/register">Register</MenuItem>
                 </div>
                :<div>
                    <MenuItem onClick={handleClose} component="a" href="/mainPage">Profile</MenuItem>
                    <MenuItem onClick={(event) => {handleLogout(event); handleClose(); }} >Logout</MenuItem>
                </div>
            }
            </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
        open={open}
      >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
          </div>

        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
              <Router>
                  <Switch>
                  <Route exact path= "/mainPage">
                      <MainPage></MainPage>
                  </Route>
                  <Route path= "/register">
                      <RegisterForm></RegisterForm>
                  </Route>
                  <Route path= "/build">
                      <BuildMapView></BuildMapView>
                  </Route>
                  <Route path= "/view">
                      <ViewMap></ViewMap>
                  </Route>
                  <Route path= "/login">
                      <Login></Login>
                  </Route>
                  <Route path= "/maps">
                      <ListMaps></ListMaps>
                  </Route>
                  </Switch>
                </Router>
              </Paper>
            </Grid>
          
          </Grid>
        </Container>
        
      </main>
    </div>
  );
}
