import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));


const Header = () => {
  const classes = useStyles();
  return <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>

        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon/>

        </IconButton>

        <Link to='/' className={classes.link}>
          <Typography variant="h6" className={classes.title}>
            Miloky
          </Typography>
        </Link>

      </Toolbar>
    </AppBar>
  </div>;
};

export default Header;
