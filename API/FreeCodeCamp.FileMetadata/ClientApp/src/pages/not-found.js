import React from 'react';
import { Container, Divider, Box, Typography } from '@material-ui/core';
import Header from '../components/header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '60px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    position: 'relative'
  },
  code: {
    fontWeight: 'bold',
    padding: '10px'
  },
  description: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center'
  }
}));

// TODO: Check markup of page https://material-ui.com/getting-started/templates/bloga
const NotFound = () => {
  const classes = useStyles();
  return <>
    <Header/>
    <Container className={classes.container}>
      <Box className={classes.root}>
        <Typography variant='h5' component='h5' className={classes.code}>
          404
        </Typography>
        <Divider orientation="vertical" flexItem/>
        <Typography className={classes.description}>
          This page could not be found.
        </Typography>
      </Box>
    </Container>
  </>;
};

export default NotFound;