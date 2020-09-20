import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card , CardHeader, CardMedia, Avatar} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DocumentLogo from '../../assets/svg/document.svg';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { bytesToMb, isImgExtension, isPdfExtension, readFileAsBase64Async } from '../../unit/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  fileName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  header: {
    overflow: 'hidden'
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [file, setBase64File] = useState({loaded: false, base64File: null});

  const getFilePreview = useCallback(async () => {
    if (!isImgExtension(props.file.name)) {
      return;
    }

    try {
      const base64 = await readFileAsBase64Async(props.file);
      setBase64File({loaded: true, base64File: base64});
    } catch (err) {
      setBase64File({loaded: true});
    }
  }, [props.file]);

  useEffect(() => {
    getFilePreview();
  }, [getFilePreview]);

  const renderIcon = () => {
    if (isImgExtension(props.file.name)) {
      return <ImageIcon/>;
    } else if (isPdfExtension(props.file.name)) {
      return <PictureAsPdfIcon/>;
    } else {
      return <InsertDriveFileIcon/>;
    }
  };

  const renderImage = () => {
    if (isImgExtension(props.file.name)) {
      return file.base64File?.body;
    } else {
      return DocumentLogo;
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          titleTypographyProps={{className: classes.fileName}}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {renderIcon()}
            </Avatar>
          }
          title={props.file.name}
          subheader={`${bytesToMb(props.file.size).toFixed(2)} Mb`}
        />

        <CardMedia
          className={classes.media}
          image={renderImage()}
          title={props.file.name}
        />
      </Card>
    </>
  );
}
