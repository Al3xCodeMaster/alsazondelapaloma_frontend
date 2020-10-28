import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { success_login, error_login } from '../../redux/actions';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import logo from '../../images/logo.png';
//import presentacion2 from '../../images/presentacion2.mp4';
import { KeyboardTab } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Formulario_empleado from '../inicio_usuario/formulario_usuario';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Al sazón de la Paloma '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login_usuario = () => {
  const { message, usuario } = useSelector(state => ({
    message: state.redux_reducer.message,
    usuario: state.redux_reducer.usuario,
  }));
  const dispatch = useDispatch();
  const [cedula, set_cedula] = useState('');
  const [contrasenha, set_contrasenha] = useState('');
  const [error_cedula, set_error_cedula] = useState(false);
  const [pass_invalid, set_pass_invalid] = useState(false);
  const [helper_cedula, set_helper_cc] = useState('');
  const [helper_contrasenha, set_helper_pass] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openAut, setOpenAut] = React.useState(false);
  const [error_contrasenha, set_error_contrasenha] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = openAut && options.length === 0;
  const [type_id, set_type_id] = useState('');
  const vertical = 'center';
  const horizontal = 'right';
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		fetch('http://localhost:4000/getAllDocuments', {
				method: 'GET'
			}).then(res => res.json())
			.then(items => {
				if(active){
					setOptions(items.map((x) => x.DocumentTypeID));
				}
			})
			.catch(err => console.log(err));
		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
		  setOptions([]);
		}
	  }, [open]);

  const ingresar = () => {

      set_error_cedula(false);
      set_error_contrasenha(false);
      set_helper_pass('');
      set_helper_cc('');
      let status;
      fetch('http://localhost:4000/userLogin', {
        method: 'POST',
        body: JSON.stringify({ RestaurantUserID: parseInt(cedula), DocumentTypeID: type_id, RestaurantUserPass: contrasenha }) // data can be `string` or {object}!
      }).then(res => { status = res.status; return res.json()})
        .then(response => {
          if(response.error){
            set_pass_invalid(true);
            dispatch(error_login(response.error));
          }else{
            dispatch(success_login(response, status));
          }
        })
        .catch(error => alert("Error con la conexión al servidor "+error));
  }
  return (
    <Grid container component="main" className={classes.root}>
      {usuario.status===200 ? <Redirect to="/inicio/usuario" /> : null}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              error={error_cedula}
              helperText={helper_cedula}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cedula"
              label="ID"
              name="cedula"
              value={cedula}
              onChange={e => set_cedula(e.target.value)}
              autoFocus
            />
            <Autocomplete
                            id="async-autocompl"
                            open={openAut}
                            onOpen={() => {
                              setOpenAut(true);
                            }}
                            onClose={() => {
                              setOpenAut(false);
                            }}
                            getOptionSelected={(option, value) => option === value?set_type_id(value):false}
                            getOptionLabel={(option) => option}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    className={classes.input}
                                    label="Seleccione el documento"
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
            <TextField
              variant="outlined"
              margin="normal"
              error={error_contrasenha}
              helperText={helper_contrasenha}
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              color='primary'
              value={contrasenha}
              onChange={e => set_contrasenha(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => ingresar()}
              style={{ background: '#c62828', MozBorderRadius: 40, color: 'white', fontSize: 20, font: 'bold' }}
              className={classes.submit}
            >
              Ingresar
               <KeyboardTab style={{ fontSize: 35, marginLeft: '10px' }} />
            </Button>
            <Snackbar open={pass_invalid} autoHideDuration={4000}
              anchorOrigin={{ vertical, horizontal }}
            >
              <Alert onClose={() => set_pass_invalid(false)} variant="filled" severity="error">
                {"Error en la contraseña o usuario: "}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ color: '#707070' }}>
                  Recuperar contraseña
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Login_usuario;