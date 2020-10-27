import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    TextField,
    Grid,
    IconButton,
    Popover,
    Slide,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { CheckCircleOutline, DeleteOutline } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5%',
        flexGrow: 1,
    },
    card_root: {
        minWidth: 275,
        marginBottom: '2%',
    },
    card_bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    card_title: {
        fontSize: 14,
    },
    card_pos: {
        marginBottom: 12,
    },
    scroll_grid: {
        height: '500px',
        overflowY: 'scroll'
    },
}));


export default function Perfiles() {
    const classes = useStyles();
    const [fetch_profiles, set_fetch_profiles] = useState([]);
    const [nombre_profile, set_nombre_profile] = useState('');
    const [nombre_profile_temp, set_nombre_profile_temp] = useState([]);
    const [cargando, set_cargando] = useState(false);
    const [error, set_error] = React.useState(false);
    const [error_message, set_error_message] = useState('');
    const [success, set_success] = React.useState(false);
    const [success_message, set_success_message] = useState('');
    const [activado, set_activado] = useState('Activo');
    const [gilad, set_gilad] = useState(true);
    const [value, setValue] = React.useState(0);
    const [nombre_profile_to_change, set_nombre_profile_to_change] = useState('');
    const vertical = 'top';
    const horizontal = 'right';
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  const openP = Boolean(anchorEl);
  const id = openP ? 'simple-popover' : undefined;


    const set_state_gilad = () => {
        set_gilad(!gilad);
        set_activado(!gilad?'Activo':'No activo');
    }

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const add_profile = () => {
        let temp_profiles = nombre_profile_temp;
        temp_profiles.filter(x => x.ProfileName === nombre_profile).length === 0 ? temp_profiles.push({ ProfileName: nombre_profile, ProfileStatus: gilad}) : set_error_message('Ya se ha creado este perfil');
        set_nombre_profile_temp(temp_profiles);
        set_nombre_profile('');
        set_gilad(true);
        set_cargando(true);
    }
    
    const eliminar_profile_temp = (value) => {
        let temp = nombre_profile_temp;
        console.log(value);
        for (let i = 0; i < temp.length; i++) {
            if (value === temp[i].ProfileName) {
                temp.splice(i, 1);
            }
        }
        set_nombre_profile_temp(temp);
        set_cargando(false);
    }
  

    const borrar_perfil = (valueId, valueName) => {
        fetch('http://localhost:4000/updateProfile', {
            method: 'POST',
            body: JSON.stringify({
                ProfileID: parseInt(valueId),
                ProfileName: valueName,
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
            });
    }
    
    
    const guardar_perfil = () => {
        
        fetch('http://localhost:4000/createProfile', {
            method: 'POST',
            body: JSON.stringify(nombre_profile_temp[0])
        }).then(res => res.json())
            .then(response => {
                    set_success(true);
                    set_success_message('Perfil agregado con éxito');
            })
            .catch(err => {
                set_error(true);
                set_error_message('Error en la conexión con el servidor '+err);
            });
    }

    useEffect(() => {
        fetch('http://localhost:4000/getAllProfiles', {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                if(response.length > 0){
                    set_fetch_profiles(response);
                }
            })
            .catch(error => {
                alert(error);
    })}, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    TabPanel.propTypes = {
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
    
    const cambiar_nom_perfil = (valueId) => {
        fetch('http://localhost:4000/updateProfile', {
            method: 'POST',
            body: JSON.stringify({
                ProfileID: parseInt(valueId),
                ProfileName: nombre_profile_to_change
            })
        }).then(res => res.json())
            .then(response => {
                    if(response.error){
                        set_error(true);
                        set_error_message('Error: '+response.error);
                        return
                    }
                    set_success(true);
                    set_success_message('Perfil cambiado con éxito');
                    if(response.length > 0){
                        set_fetch_profiles(response);
                    }
            })
            .catch(err => {
                set_error(true);
                set_error_message('Error en la conexión con el servidor '+err);
            });
    }  


    return (
        <Fragment>
            <h2 style={{ color: 'gray', textAlign: 'center' }}>
                Pantalla Perfiles de usuario
            </h2>
            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Crear Perfil" {...a11yProps(0)} />
            <Tab label="Asignar Perfil" {...a11yProps(1)} />
            </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            <Grid container className={classes.root} spacing={5}>
                <Grid item xs={6}>
                        <TextField
                            id="standard-textarea"
                            label="Nombre del perfil"
                            fullWidth
                            multiline
                            disabled={cargando}
                            value={nombre_profile} onChange={e => set_nombre_profile(e.target.value)}
                        />
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        value={activado}
                        control={<Switch disabled={cargando} checked={gilad} onChange={e => set_state_gilad()} />}
                        label={activado}
                        labelPlacement="top"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button disabled={cargando} style={{ color: 'green', marginLeft: '1%' }} onClick={e => add_profile()}>
                        Agregar
						<CheckCircleOutline style={{ fontSize: 30, marginLeft: '10px', color: 'green' }} />
                    </Button>
                </Grid>
            </Grid>
            <h3 style={{ textAlign: 'center', color: 'gray' }}>Lista de perfiles a guardar</h3>
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table stickyHeader={true} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del perfil</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            nombre_profile_temp.map((element) => (
                                <TableRow key={element.ProfileName}>
                                    <TableCell>{element.ProfileName}</TableCell>
                                    <TableCell>{element.ProfileStatus?"Activo":"No activo"}</TableCell>
                                    <TableCell><IconButton onClick={e => eliminar_profile_temp(element.ProfileName)} children={<DeleteOutline style={{ fontSize: 25, marginLeft: '8px', color: 'red' }}/>} /></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
                <div style={{ textAlign: 'center', marginTop: '4%' }}>
                    <Button style={{ color: 'white', backgroundColor: 'green' }} variant="contained" onClick={e => guardar_perfil()}>
                        REGISTRAR PERFIL
                            <CheckCircleOutline style={{ fontSize: 30, marginLeft: '10px', color: 'green' }} />
                    </Button>
                </div>
                <br></br>
            <h3 style={{ textAlign: 'center', color: 'gray' }}>Perfiles registrados</h3>
            <TableContainer component={Paper} style={{ width: '97%' }}>
                <Table stickyHeader={true} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha de creación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            fetch_profiles.map((element) => (
                                <TableRow key={element.ProfileID}>
                                    <TableCell>{element.ProfileID}</TableCell>
                                    <TableCell>{element.ProfileName}</TableCell>
                                    <TableCell>{element.ProfileStatus?"Activo":"No activo"}</TableCell>
                                    <TableCell>{element.ProfileCreationDate? new Date(element.ProfileCreationDate).toLocaleDateString():null}</TableCell>
                                    <TableCell>
                            <IconButton onClick={handleClick} children={<EditIcon style={{ fontSize: 25, marginLeft: '8px', color: 'green'}}/>}/>
                                        <Popover
                                                        id={id}
                                                        open={openP}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                        }}
                                                    >
                                                        <Typography className={classes.typography}>Cambiar nombre perfil</Typography>
                                                        <TextField
                                                                id="cambio-perfil"
                                                                label="Nuevo nombre"
                                                                fullWidth
                                                                value={nombre_profile_to_change} onChange={e => set_nombre_profile_to_change(e.target.value)}
                                                        />
                                                        <IconButton onClick={e => cambiar_nom_perfil(element.ProfileID)} children={<CheckIcon style={{ fontSize: 'inherit', marginLeft: '2px', color: 'green'}}/>}/>
                                        </Popover>
                                    </TableCell>
                                    <TableCell><IconButton onClick={e => borrar_perfil(element.ProfileID,element.ProfileName)} children={<DeleteOutline style={{ fontSize: 25, marginLeft: '8px', color: 'red' }}/>} /></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <h1>Equisde</h1>
            </TabPanel>
            <Snackbar open={error} autoHideDuration={2000}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={() => set_error(false)} variant="filled" severity="error">
                    {error_message}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={2000}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={() => set_success(false)} variant="filled" style={{backgroundColor:'white', color:'black'}}>
                    {success_message}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
  }