import React, { useEffect, useRef, useState } from 'react';
import useDndFiles from '../../hooks/useDndFile';
import Header from '../../components/header';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgressWithLabel from '../../components/linear-progress-with-label';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Card from './card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { bytesToMb, isImgExtension, isPdfExtension } from '../../unit/constants';
import FileMetadataModal from './file-metadata-modal';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  dndArea: {
    height: '200px',
    cursor: 'pointer',
    position: 'relative'
  },
  text: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loader: {
    position: 'absolute',
    bottom: '10px',
    left: 0,
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '8px'
  },
  header: {
    paddingBottom: '20px'
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  dndIconContainer:{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '40px'
}
}));

const FileMetadata = () => {
  const classes = useStyles();
  const dndAreaRef = useRef(null);
  const [size, setSize] = useState(0);
  const [open, setOpen] = useState(false);
  const [files, fileManager] = useDndFiles(dndAreaRef, {
    beforeFileAdded: (file) => {
      if (!isPdfExtension(file.name) && !isImgExtension(file.name)) {
        alert('Only pdf and images');
      } else {
        // TODO: Change on snackbar
        return file;
      }
    }
  });
  useEffect(() => {
    const size = files.reduce((size, file) => size + file.size, 0);
    setSize(bytesToMb(size));
  }, [files, setSize]);

  const handleDelete = (file) => {
    fileManager.removeFile(file);
  };

  const submitHandler = async () => {
    // TODO: Change on snackbar
    if(size>50){
      alert('The files size are too big!');
      return;
    }
    if(files.length === 0){
      alert('Load files first!')
      return;
    }
    setOpen(true);
  };
  const progressProps = {
    color: size >= 50 ? 'secondary' : 'primary',
    value: Math.min(size * 2, 100)
  };

  return <>
    <Header/>
    {open && <FileMetadataModal files={files} onClose={() => setOpen(false)}/>}
    <Container>
      <Typography variant='h5' className={clsx(classes.header, ' text-center')}>
        API Project: File Metadata Microservice
      </Typography>

      <Paper ref={dndAreaRef} elevation={3} className={classes.dndArea}>
        <div className={classes.dndIconContainer}>
          <CloudUploadOutlinedIcon fontSize='large'/>
          <Typography className={classes.text}>
            Choose a file or drag it here.
          </Typography>
        </div>
        <LinearProgressWithLabel leftLabel='0 Mb' rightLabel='50 Mb' className={classes.loader}
                                 progressProps={progressProps}/>
      </Paper>
      <Grid container>
        <Grid item xs={12} className={classes.submitContainer}>
          <Button variant='outlined' color='primary' onClick={submitHandler}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {files.map(file => (
          <Grid key={file.name} item xs={12} sm={6} md={4}>
            <Card key={file.name} file={file} onDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>

    </Container>
  </>;
};


export default FileMetadata;