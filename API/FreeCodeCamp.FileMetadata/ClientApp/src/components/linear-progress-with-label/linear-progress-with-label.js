import React from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
  label: {
    whiteSpace: 'nowrap'
  }
}));

const LinearProgressWithLabel = (props) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" className={props.className}>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary" className={classes.label}>
          {props.leftLabel}
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props.progressProps} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary" className={classes.label}>
          {props.rightLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;