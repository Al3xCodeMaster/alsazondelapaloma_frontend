import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LandingPage from './landingPage'
import AppBarActions from './appBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#FF0000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  input: {
		width: '100%',
		margin: '1%'
  }
}));

const Login_cliente = () => {
  return (
    <ThemeProvider theme={theme}>
        <AppBarActions/>
        <LandingPage/>
    </ThemeProvider>
  );
};
export default Login_cliente;
