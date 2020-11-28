import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { success_login, error_login } from '../../redux/actions';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import logo from '../../images/logo.png';
//import presentacion2 from '../../images/presentacion2.mp4';
import { Check } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../../images/logo.png';
import line from '../../images/line.png';
import video from '../../images/video.mp4';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from "@material-ui/core/AppBar";
import AppBarActions from '../login_cliente/appBar'

const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#FF0000',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#000000',
      },
    },
  });

const useStyles = makeStyles((theme) => ({
}));

const Carta = () => {
  const { message, usuario } = useSelector(state => ({
    message: state.redux_reducer.message,
    usuario: state.redux_reducer.usuario,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        <AppBarActions/>
        <h1>Menú</h1>
    </ThemeProvider>
  );
}
export default Carta;