import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//import logo from '../../images/logo.png';
//import presentacion from '../../images/presentacion.mp4';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import cover from "../../images/cover.png";
import chef1 from "../../images/chef1.jpg";
import chef2 from "../../images/chef2.jpg";
import chef3 from "../../images/chef3.jpg";
import video from "../../images/coverVideo.mp4";
import logo from "../../images/logo.png";
import restaurante from "../../images/restaurante.jpg";
import Fab from "@material-ui/core/Fab";
import SignIn from "./login";
//CARD
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
// webfontloader configuration object. *REQUIRED*.
const config = {
  google: {
    families: ["Source Sans Pro:300,600"],
  },
};

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
}));

const Login_cliente = () => {
  const { nav_bar, client } = useSelector((state) => ({
    nav_bar: state.redux_reducer.nav_bar,
    client: state.redux_reducer.client,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openD, setOpenD] = React.useState(false);
  const handleClose = () => {
    setOpenD(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position="sticky"
          style={{
            top: 0,
            left: 0,
            margin: 0,
            background: "black",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <RestaurantMenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {"Al Sazón de la Paloma" +
                (client.status == 200
                  ? " - ¡Bienvenido, " +
                    client.clientInfo.Payload.ClientName +
                    " " +
                    client.clientInfo.Payload.ClientLastName +
                    "!"
                  : "")}
            </Typography>
            <Button color="inherit">
              <ShoppingCartIcon />
            </Button>
            <Button color="inherit">Carta</Button>
            {nav_bar === "principal" ? (
              <Button color="inherit" onClick={(e) => setOpenD(true)}>
                Login
              </Button>
            ) : (
              <Button color="inherit">Salir</Button>
            )}
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root} style={{ marginBottom: "2%" }}>
          <Grid item xs={12}>
            <img src={cover} height="110%" width="100%" alt="cover" />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <div
              style={{
                textAlign: "justify",
                textJustify: "inter-word",
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "6%",
              }}
            >
              Contamos con personal altamente calificado con varios años de
              experiencia en el sector gastronómico, especialmente el sazón
              peruano. Somos reconocidos por nuestros deliciosos platos picantes
              tradicionales del suroccidente de nuestro país y por nuestra
              especialidad de postres a base de cacao.
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "1%",
              }}
            >
              <Grid container style={{ marginBottom: "2%" }} spacing={2}>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Alfonso Peralta"
                      subheader="El mago Inca"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef1}
                      title="Ganador del mejor plato Traditional Food-2019"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Alfonso es catalogado actualmente como uno de los
                        mejores chefs de Perú, su gran habilidad con las
                        especias y la comida de mar le ha dado el título del
                        mago Inca. Una vez hayas probado uno de sus exquisitos
                        platos, vas a querer repetir.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Marcela Curui"
                      subheader="Corazón de Cacao"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef2}
                      title="Mejor postre de chocolate Peruano - 208"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Marcela Curui es una gran chef cuyos platos se
                        caracteriza por el gra uso del cacao para realizar
                        diferentes receta. Ha logrado un gran renombre no solo
                        en Perú sino también en todo latinoamerica.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title="Miguel Rodriguez"
                      subheader="El tiki palomón"
                    />
                    <CardMedia
                      className={classes.media}
                      image={chef3}
                      title="Mejor Guiso de Paloma 2020"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Miguel es un experto en cuanto guisos y sopas se trata,
                        no hay nadie que no se pueda resistir a sus deliciosas
                        recetas. Ha sido reconocido por importantes revistas por
                        su gran habilidad en la cocina.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: "black" }}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img
                    src={restaurante}
                    height="100%"
                    width="100%"
                    alt="cover"
                  />
                </Grid>
                <Grid item xs={6}>
                  <p
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      color: "white",
                      marginRight: "2%",
                    }}
                  >
                    Tenemos alrededor del país diferentes sedes las cuales
                    cumplen con todas las políticas de salubridad y el diseño de
                    interior está pensado para la comodidad de nuestros
                    clientes. Todas nuestras sedes se caracterizan por estar
                    ubicadas en lugares con gran fluidez de tráfico interesa que
                    los clientes puedan llegar con facilidad a nuestras
                    instalaciones. Además de brindar un gran servicio
                    personalizado a cada uno de nuestros clientes.
                  </p>
                  <p
                    style={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      color: "white",
                      marginRight: "2%",
                    }}
                  >
                    Actualmente contamos dos tipos de servicios los cuales son
                    comer en el lugar y para llevar domicilio ambos procesos
                    deben llevarse a cabo por nuestra página web.
                  </p>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <video
                src={video}
                width="100%"
                height="70%"
                autoPlay={true}
                muted
                loop
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <p>Contacto</p>
                  <a href="" style={{ color: "black" }}>
                    <PhoneIcon /> 323515466
                  </a>
                  <br />
                  <a href="" style={{ color: "black" }}>
                    <EmailIcon /> alsazonpaloma@gmail.comm
                  </a>
                  <br />
                  <br />
                  <a href="" style={{ color: "black" }}>
                    <FacebookIcon />
                  </a>
                  <a href="" style={{ color: "black" }}>
                    <InstagramIcon />
                  </a>
                  <a href="" style={{ color: "black" }}>
                    <TwitterIcon />
                  </a>
                </Grid>
                <Grid item xs={6}>
                  <p>Certificación</p>
                  <p>ISO 9000/5</p>
                  <p>lubricity certificate 3.52</p>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={openD}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <SignIn />
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
export default Login_cliente;
