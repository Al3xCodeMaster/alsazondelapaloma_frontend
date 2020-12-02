import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//import logo from '../../images/logo.png';
//import presentacion from '../../images/presentacion.mp4';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import SignIn from "./login";
//CARD
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Input, DialogContentText} from "@material-ui/core";
import { success_login_client, set_coordinates } from "../../redux/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search_location from '../mapas/search_location';
import LockIcon from '@material-ui/icons/Lock';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CheckCircleOutline, DeleteOutline } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
  root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
		background: 'green'
	},
	input: {
		width: '95%',
		margin: '1%'
	}
}));

const AppBarActions = () => {
  const {nav_bar, client, coordenadas} = useSelector((state) => ({
    nav_bar: state.redux_reducer.nav_bar,
    client: state.redux_reducer.client,
    coordenadas: state.redux_reducer.coordenadas
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [menuRedirect, setMenuRedirect] = React.useState(false);
  const [openDS, setOpenDS] = React.useState(false);
  const [openDU, setOpenDU] = React.useState(false);
  const [openDC, setOpenDC] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [mail, setMail] = React.useState("");
  const [sex, setSex] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [open_success, set_open_sucess] = React.useState(false);
  const [message, set_message] = React.useState("");
  const [message_success, set_message_success] = React.useState("");
  const vertical = "top";
  const horizontal = "right";
  const [date, setDate] = React.useState(null);
  const [contrasenhaNew, set_contrasenhaNew] = useState('');
  const [contrasenhaOld, set_contrasenhaOld] = useState('');
  const [showPassword, set_showPassword] = useState(false);
  const [options, setOptions] = useState([]);
  const [openPM, setOpenPM] = useState(false);
  const loading = openPM && options.length === 0;
  const [bankSelected, setbankSelected] = useState("");
  const [openDPM, setOpenDPM] = useState(false);
  const [numero_tarjeta, set_numero_tarjeta] = useState("");
  const [fetch_pay_method, set_fetch_pay_method] = useState([]);

  const set_open_DMP = () => {
    refresh();
    setOpenDPM(true);
  }

  const refresh = () => {
      fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "getAllPayMethodClient/"+client.clientInfo.Payload.Id+"/"+client.clientInfo.Payload.DocType+"/"+false, {
        method: "GET",
      })
        .then((res) => (res.status === 204 ? [] : res.json()))
        .then((response) => {
              if(response.error){
                set_message(true);
                setOpen("Error al cargar: "+response.error);
                return; 
              }
              set_fetch_pay_method(response);
        })
        .catch((error) => {
          alert(error);
        });
  }

  const perfomChange = (event) => {
    if(window.confirm("¿Desea cambiar la contraseña?")){
      fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "updateClientPassword", {
        method: 'POST',
        body: JSON.stringify({
          ClientID: client.clientInfo.Payload.Id,
          DocumentTypeID: client.clientInfo.Payload.DocType,
          OldPassword: contrasenhaOld,
          NewPassword: contrasenhaNew
        })      
    }).then(res => res.json())
        .then(response => {
                if(response.error){
                  set_message("No se realizo la operación: " + response.error);
                  setOpen(true);
                }else{
                  set_open_sucess(true);
                  set_message_success('Contraseña cambiada con éxito');
                }
        })
        .catch(err => {
         
        })
        set_contrasenhaNew('');
        set_contrasenhaOld('');
        setOpenDC(false);
    }
}


React.useEffect(() => {
  let active = true;

  if (!loading) {
    return undefined;
  }

  fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "getAllAvailableBanks", {
      method: 'GET'
    }).then(res => res.json())
    .then(items => {
      if(active){
        setOptions(items.map((x) => x.BankID));
      }
    })
    .catch(err => console.log(err));
  return () => {
    active = false;
  };
}, [loading]);

React.useEffect(() => {
  if (!openPM) {
    setOptions([]);
  }
  }, [openPM]);

  const updateClient = () => {
    let status;
    fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "updateClient", {
        method: "POST",
        body: JSON.stringify({
          ClientID: client.clientInfo.Payload.Id,
          ClientName: name,
          LastName: lastName,
          ClientPhone: tel,
          ClientEmail: mail,
          ClientSex: sex==="M",
          ClientLatitude: parseFloat(coordenadas.lat),
          ClientLongitude: parseFloat(coordenadas.lng),
          DocumentTypeID: client.clientInfo.Payload.DocType,
          ClientBirthDate: date
        }), // data can be `string` or {object}!
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((response) => {
          if (status === 400) {
            set_message("No se realizo la operación: " + response.error);
            setOpen(true);
          } else {
            set_message_success("Hecho");
            dispatch(
              success_login_client(
                {
                  Payload: {
                    ...client.clientInfo.Payload,
                    ClientName: name,
                    LastName: lastName,
                    ClientPhone: tel,
                    ClientEmail: mail,
                    ClientSex: sex,
                    ClientBirthDate: date
                  },
                  Message: "Ingreso Realizado!",
                },
                200
              )
            );
            setOpenDU(false);
            set_open_sucess(true);
          }
        })
        .catch((error) => {
          alert(error);
        });
  };

  const handleCloseDS = () => {
    setOpenDS(false);
  };

  const handleCloseDU = () => {
    setOpenDU(false);
    setEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSucess = () => {
    set_open_sucess(false);
  };

  const handleMouseDownPassword = (event) => {
		event.preventDefault();
  };

  const updateDialog = () => {
    setName(client.clientInfo.Payload.ClientName);
    setLastName(client.clientInfo.Payload.LastName);
    setTel(client.clientInfo.Payload.ClientPhone);
    setMail(client.clientInfo.Payload.ClientEmail);
    setSex(client.clientInfo.Payload.ClientSex?"M":"F");
    setOpenDU(true);
    setDate(new Date(client.clientInfo.Payload.Birthdate));
    dispatch(set_coordinates({ lat: client.clientInfo.Payload.ClientLatitude, lng: client.clientInfo.Payload.ClientLongitude }));
  }

  const performSave = () => {
    fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "addPayMethod", {
      method: "POST",
      body: JSON.stringify({
        CardNumber: numero_tarjeta,
        BankID: bankSelected,
        ClientID: client.clientInfo.Payload.Id,
        DocumentTypeID: client.clientInfo.Payload.DocType
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if(resp.error){
          set_message(true);
          setOpen("Error al añadir: "+resp.error);
        }else{
          set_open_sucess(true);
          set_message_success("Metodo agregado con éxito");
          set_numero_tarjeta("");
          refresh();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  const updatePayMethod = (cardN, bankId, state) => {
    fetch((process.env.URL_HEROKU_BACKEND || "http://localhost:4000/") + "updatePayMethod", {
      method: "POST",
      body: JSON.stringify({
        CardNumber: cardN,
        BankID: bankId,
        ClientID: client.clientInfo.Payload.Id,
        DocumentTypeID: client.clientInfo.Payload.DocType,
        PayMethodStatus: state
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if(resp.error){
          set_message(true);
          setOpen("Error al cambiar el metodo: "+resp.error);
        }else{
          set_open_sucess(true);
          set_message_success("Metodo cambiado con éxito");
          refresh();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {client.status===200 ? <Redirect to="/inicio/cliente/carta" /> : null}
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
              {"Al Sazón de la Paloma"+(client.status==200?" - ¡Bienvenido, "+client.clientInfo.Payload.ClientName+" "+client.clientInfo.Payload.LastName+"!":"")}
            </Typography>
            {nav_bar==='principal'?null:<Button color="inherit" onClick={e => setOpenDC(true)}><LockIcon/></Button>}
            {nav_bar==='principal'?null:<Button color="inherit" onClick={updateDialog}><AccountCircleIcon/></Button>}
            <Button color="inherit"><ShoppingCartIcon/></Button>
            {nav_bar==='principal'?<Button color="inherit" onClick={(e)=> setMenuRedirect(true)}>Carta</Button>:null}
            {nav_bar==='principal'?null:<Button color="inherit" onClick={e => set_open_DMP()}><CreditCardIcon/></Button>}
            {nav_bar==='principal'?<Button color="inherit" onClick={e => setOpenDS(true)}>Login</Button>:<Button color="inherit">Salir</Button>}
          </Toolbar>
        </AppBar>
        <Dialog open={client.status==200?false:openDS} onClose={handleCloseDS} aria-labelledby="form-dialog-title">
              <DialogContent>
                <SignIn/>
              </DialogContent>
        </Dialog>
        <Dialog open={openDU} onClose={handleCloseDU} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title-update">Mis datos</DialogTitle>
        <DialogContent>
          <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Cambiar mis datos</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Button color="inherit" onClick={(e) => setEdit(!edit)}><BorderColorIcon/></Button>
          {client.status==200?<form className={classes.form} noValidate autoComplete="off">
          <TextField label="Doc Num" defaultValue={client.clientInfo.Payload.Id} disabled inputProps={{ 'aria-label': 'description' }}/>
          <TextField label="Tipo de doc" defaultValue={client.clientInfo.Payload.DocType} disabled inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={name} onChange={e => setName(e.target.value)} label="Nombre" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={lastName} onChange={e => setLastName(e.target.value)} label="Apellido" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={tel} onChange={e => setTel(e.target.value)} label="Telefono" type='number' disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={mail} onChange={e => setMail(e.target.value)} label="Email" type='email'  disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <TextField value={sex} onChange={e => setSex(e.target.value)} label="Sexo" disabled={edit} inputProps={{ 'aria-label': 'description' }}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled={edit}
              id="date-picker-birthday-client-update"
              label="Fecha de nacimiento"
              format="yyyy/MM/dd"
              value={date}
              onChange={value => setDate(value)}
              KeyboardButtonProps={{
                "aria-label": "Cambiar fecha",
              }}
            />
          </MuiPickersUtilsProvider>           
          </form>:null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Cambiar mi dirección</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Search_location/>
        </ExpansionPanelDetails>
      </ExpansionPanel> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDU} color="primary">
            Cancelar
          </Button>
          <Button onClick={updateClient} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDPM} onClose={e => setOpenDPM(false)} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title-dp">Mis metodos de pago</DialogTitle>
              <DialogContent>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="standard-text-met-id"
              label="Numero de tarjeta"
              fullWidth
              type="number"
              value={numero_tarjeta}
              onChange={(e) => set_numero_tarjeta(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="async-autocompl-pay"
              open={openPM}
              onOpen={() => {
                setOpenPM(true);
              }}
              onClose={() => {
                setOpenPM(false);
              }}
              getOptionSelected={(option, value) => option === value}
              onChange={(event, newValue) => {
                setbankSelected(newValue);
              }}
              getOptionLabel={(option) => option}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  className={classes.input}
                  label="Seleccione el banco"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              style={{ color: "green", marginLeft: "1%" }}
              onClick={(e) => performSave()}
            >
              Agregar
              <CheckCircleOutline
                style={{ fontSize: 30, marginLeft: "10px", color: "green" }}
              />
            </Button>
          </Grid>
        </Grid>      
        <br></br>
        <h3 style={{ textAlign: "center", color: "gray" }}>
          Mis metodos de pago registrados
        </h3>
        <TableContainer component={Paper} style={{ width: "97%" }}>
          <Table stickyHeader={true} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell># Tarjeta</TableCell>
                <TableCell>Banco</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de creación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetch_pay_method.map((element) => (
                <TableRow key={element.CardNumber+ "-" + element.ClientID}>
                  <TableCell>{element.CardNumber}</TableCell>
                  <TableCell>{element.BankID}</TableCell>
                  <TableCell>
                    {element.PayMethodStatus ? "Activo" : "No activo"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                          element.PayMethodCreationDate
                        ).toLocaleDateString()
                    }
                  </TableCell>
                  <TableCell>
                    {element.PayMethodStatus ? (
                      <IconButton
                        onClick={(e) => updatePayMethod(element.CardNumber,element.BankID, false)}
                        children={
                          <DeleteOutline
                            style={{
                              fontSize: 'inherit',
                              marginLeft: "8px",
                              color: "red",
                            }}
                          />
                        }
                      />
                    ) : (
                      <IconButton
                        onClick={(e) =>
                          updatePayMethod(element.CardNumber,element.BankID, true)
                        }
                        children={
                          <AddCircleIcon
                            style={{
                              fontSize: 'inherit',
                              marginLeft: "8px",
                              color: "green",
                            }}
                          />
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button onClick={e => setOpenDPM(false)} color="primary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openDC} onClose={e => setOpenDC(false)} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Cambio de contraseña</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Recuerde que la nueva contraseña debe de ser de mas de 6 caracteres.
                </DialogContentText>
                <TextField
                  onChange={(e) => set_contrasenhaOld(e.target.value)}
                  margin="dense"
                  id="old_pass"
                  label="Digite su actual contraseña"
                  type="password"
                  fullWidth
                  value={contrasenhaOld}
                />
                <FormControl className={classes.input}>
                <InputLabel htmlFor="standard-adornment-password">Nueva contraseña</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={contrasenhaNew}
                  onChange={e => set_contrasenhaNew(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={e => set_showPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={e => setOpenDC(false)} color="primary">
                  Cerrar
                </Button>
                <Button onClick={perfomChange} color="primary">
                  Cambiar
                </Button>
              </DialogActions>
            </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open_success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseSucess} severity="success">
          {message_success}
        </Alert>
      </Snackbar>
      </Box>
    </ThemeProvider>
  );
};
export default AppBarActions;