import React, { useEffect, useState } from 'react';
import { Modal, IconButton } from '@material-ui/core';
import ReactJson from 'react-json-view';
import { makeStyles } from '@material-ui/core/styles';
import fileMetadataService from '../../services/file-metadata-service';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: 'auto'
  },
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: theme.palette.background.paper,
    transform: 'translateX(-50%)',
    top: '20px',
    left: '50%',
    right: '50%',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loader: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}));

const FileMetadataModal = ({onClose, files}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);
  useEffect(() => {
    setLoading(true);
    const subscription = fileMetadataService
      .fetchAsync(files)
      .subscribe({
        result: result => {
          setMetadata(result);
          setLoading(false);
        },
        error: error => {
          setMetadata({error: {message: error.message}});
          setLoading(false);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [files]);


  return <Modal
    className={classes.modal}
    open={true}
    onClose={onClose}
  >

    <div className={classes.paper}>
      <div className={classes.header}>
        <h2>FileCollection Metadata</h2>
        <IconButton onClick={onClose}>
          <CancelPresentationIcon/>
        </IconButton>
      </div>
      <div>
        {loading ?
          <div className={classes.loader}>
            <CircularProgress color="inherit"/>
          </div> :
          <ReactJson src={metadata}/>}
      </div>
    </div>
  </Modal>;
};

export default FileMetadataModal;