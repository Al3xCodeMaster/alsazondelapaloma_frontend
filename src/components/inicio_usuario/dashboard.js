import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';    
import Avatar from '@material-ui/core/Avatar';
import Title from './Title';
import { useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  avatar: {
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
    flexDirection: 'row'
  }
}));

  
export default function Dashboard() {
    const classes = useStyles();
    const { usuario } = useSelector(state => ({
		usuario: state.redux_reducer.usuario,
	}));
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={6}>
                <Paper className={fixedHeightPaper}>
                <Title>{usuario.status==200?usuario.userInfo.Payload.UserName+" "+usuario.userInfo.Payload.LastName:"No user"}</Title>    
                </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={7} lg={3}>
                <Paper className={fixedHeightPaper}>
                   
                        <Avatar src={usuario.status==200?"http://localhost:4000/file/"+usuario.userInfo.Payload.UrlPhoto:null } style={{width: '100%', height: '100%'}}/> 
                    
                </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={9}>
                <Paper className={classes.paper}>
                    <h1>Prueba</h1>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
    );
};