import React from 'react';
import Header from '../components/header';
import { Grid, Container } from '@material-ui/core';
import Project from '../components/project';


const Root = () => {
  return <>
    <Header/>
    <Container>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={4}>
          <Project url='/file-metadata' logo='/assets/images/file-metadata-logo.png' header='File Metadata API' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Project url='/' header='TODO List' logo='https://indyme.com/wp-content/uploads/2016/04/coming-soon.png' />
        </Grid>
      </Grid>
    </Container>
  </>;
};

export default Root;