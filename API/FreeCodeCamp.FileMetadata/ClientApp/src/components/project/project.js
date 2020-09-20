import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    maxWidth: 345
  },
  media: {
    height: 140,
    backgroundPosition: 'initial'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header:{
    marginBottom: 0
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  pad: {
    marginBottom: '5px',
    marginRight: '5px'
  }
});

const MediaCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleNavigate = () => {
    history.push(props.url);
  };

  const handleExpandClick = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          className={classes.media}
          image={props.logo}
          title="logo"
        />
        <CardContent>
          <div className={classes.headerContainer}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.header}>
              {props.header}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <Chip className={classes.pad} label="asp.net core" onClick={()=>{}} />
              <Chip className={classes.pad} label="react" onClick={()=>{}} />
              <Chip className={classes.pad} label="axios" onClick={()=>{}} />
              <Chip className={classes.pad} label="material-ui" onClick={()=>{}} />
              <Chip className={classes.pad} label="rxjs" onClick={()=>{}} />
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
