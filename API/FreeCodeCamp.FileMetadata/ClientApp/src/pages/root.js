import React from 'react';
import Header from '../components/header';
import { Grid, Container } from '@material-ui/core';
import Project from '../components/project';


const Root = () => {
  return <>
    <Header/>
    <Container>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={4}><Project url='/file-metadata' /></Grid>
        {[1, 2, 3, 4, 5, 6].map(index => <Grid item xs={12} sm={6} md={4} key={index}><Project /></Grid>)}
      </Grid>
    </Container>
  </>;
};

export default Root;