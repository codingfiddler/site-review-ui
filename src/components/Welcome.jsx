import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { colors } from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel'
// import CarouselPG from './CarouselPg.jsx'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
      backgroundColor: 'aliceblue',
      maxHeight: "100%",
      maxWidth: '100%',
  },
  title: {
    display: 'flex',
    width: "100%",
    alignContent: "center",
    backgroundColor: "lightblue",
    marginTop: "100px",
    padding: "10px"
  },
  subtitle: {
    marginTop: "50px",
    marginBottom: "50px",
  }
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    
    <Container component="main" maxWidth="l" maxHeight= '100%'>
      <CssBaseline />

      <Box className = {classes.background}>
      <div className={classes.paper}>
        <div>
            <Typography className= {classes.title} component="h1" variant="h1">
                REVENT 
            </Typography>
        </div>
        <Typography className = {classes.subtitle} component="h2" variant="h4" >
            Easily track and analyze website pages
        </Typography>
      </div>
    </Box>
    <Box component="span" m={4}>
    <div className={classes.paper}>
            <Button href = "/signin" variant="contained" color="primary">
                Sign In 
            </Button>
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            <Button href = "/signup" variant="contained" color="primary">
                Sign Up
            </Button>
            </div>
        </Box>
    </Container>
  );
}