import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';    
import Avatar from '@material-ui/core/Avatar';
import Title from './Title';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link'
import { TextField, Input, Tooltip} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UpdateUserAdmin from './formulario_update';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useSelector, useDispatch } from 'react-redux';
import {
	set_id,
	set_nombre,
	set_apellido,
	set_type_id,
	set_date
} from '../../redux/actions';

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
    flexDirection: 'row',
    width: theme.spacing(30),
    height: theme.spacing(30)
  },
  input: {
		width: '100%',
		margin: '1%'
  }
}));

  
export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { usuario, datePick} = useSelector(state => ({
    usuario: state.redux_reducer.usuario,
    datePick: state.redux_reducer.datePick
  }));
  const [open, setOpen] = React.useState(false);
  const [contrasenhaNew, set_contrasenhaNew] = useState('');
  const [contrasenhaOld, set_contrasenhaOld] = useState('');
  const [showPassword, set_showPassword] = useState(false);
  const [openPop, setopenPop] = useState(false);
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    set_contrasenhaNew('');
    set_contrasenhaOld('');
  };

  const handleClickShowPassword = () => {
		set_showPassword(!showPassword);
	  };
	
	  const handleMouseDownPassword = (event) => {
		event.preventDefault();
    };

    const perfomChange = (event) => {
        if(window.confirm("¿Desea cambiar la contraseña?")){
          /*fetch('http://localhost:4000/updateProfile', {
            method: 'PUT',
            body: JSON.stringify({
                ProfileID: value,
                ProfileStatus: false
            })      
        }).then(res => res.json())
            .then(response => {
                    if(response.error){
                        set_error(true);
                        set_error_message('Error: '+response.error);
                    }
                    set_success(true);
                    set_success_message('Perfil cambiado con éxito');
            })
            .catch(err => {
                set_error(true);
                set_error_message('Error en la conexión con el servidor '+err);
            });*/
            set_contrasenhaNew('');
            set_contrasenhaOld('');
            handleClose();
        }
    }

    const setOpenPopAction = (event) => {
        event.preventDefault();
        dispatch(set_nombre(usuario.status==200?usuario.userInfo.Payload.UserName:""));
        dispatch(set_apellido(usuario.status==200?usuario.userInfo.Payload.LastName:""));
        dispatch(set_date(usuario.status==200?new Date(usuario.userInfo.Payload.Birthdate):datePick));
        dispatch(set_id(usuario.status==200?usuario.userInfo.Payload.Id:""));
        dispatch(set_type_id(usuario.status==200?usuario.userInfo.Payload.DocType:""));
        setopenPop(true);
    }

    const handleClosePop = () => {
      dispatch(set_nombre(""));
      dispatch(set_apellido(""));
      dispatch(set_date(datePick));
      dispatch(set_id(""));
      dispatch(set_type_id(""));
      setopenPop(false);
    };

    const changeProfilePic = (file) => {
      if(window.confirm("¿Desea subir la foto? con nombre de archivo:\n\n\t"+file.name)){
        console.log("Si");
      }
    }
    
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                <Paper className={fixedHeightPaper}>
                <Title>{usuario.status==200?usuario.userInfo.Payload.UserName+" "+usuario.userInfo.Payload.LastName:"No user"}</Title>    
                <Typography color="textPrimary" className={classes.depositContext}>
                {usuario.status==200?"Numero de Documento: "+usuario.userInfo.Payload.Id:""}
                </Typography>
                <Typography color="textPrimary" className={classes.depositContext}>
                {usuario.status==200?"Tipo de Documento: "+usuario.userInfo.Payload.DocType:""}
                </Typography>
                <div>
                  <Typography color='textPrimary'>{usuario.status==200?"Fecha de nacimiento: "+(new Date(usuario.userInfo.Payload.Birthdate).toLocaleDateString()):""}
                  </Typography>
                  <Typography color='textPrimary'>{usuario.status==200?"Fecha de creación: "+(new Date(usuario.userInfo.Payload.CreationD).toLocaleDateString()):""}
                  </Typography>
                </div>
                  <Link color="primary" href="" onClick={(e) => handleClickOpen(e)}> Cambiar mi contraseña </Link>
                  <Link color="primary" href="" onClick={(e) => setOpenPopAction(e)}> Actualizar mis datos </Link>
                </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={6}>
                  <Badge
                        overlap="circle"
                        badgeContent={<Tooltip placement="right-start" title="Subir/Cambiar foto"><IconButton aria-label="Cambiar foto" component="label"><CameraAltIcon/><Input
                                                                                                                                                                                type="file"
                                                                                                                                                                                onChange={e => changeProfilePic(e.target.files[0])}
                                                                                                                                                                                style={{ display: "none" }}
                                                                                                                                                                                /></IconButton></Tooltip>}
                                                                                                                                                                                >
                        <Avatar src={usuario.status==200?"http://localhost:4000/file/"+usuario.userInfo.Payload.UrlPhoto:null } className={classes.avatar}/> 
                  </Badge>
                  
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={9}>
                <Paper className={classes.paper}>
                    <h1>Perfiles</h1>
                </Paper>
                </Grid>
            </Grid>
            </Container>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        onClick={handleClickShowPassword}
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
                <Button onClick={handleClose} color="primary">
                  Cerrar
                </Button>
                <Button onClick={perfomChange} color="primary">
                  Cambiar
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openPop} onClose={handleClosePop} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Modificar mis datos de usuario</DialogTitle>
              <DialogContent>
                <UpdateUserAdmin/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosePop} color="primary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>    
        </main>
    );
};