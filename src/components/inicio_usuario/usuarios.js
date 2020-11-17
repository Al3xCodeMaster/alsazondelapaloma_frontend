import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import FormularioUsuario from './formulario_usuario';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import {lighten} from '@material-ui/core/styles';
import { Select, TextField, MenuItem, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "5%",
      flexGrow: 1,
    },
    card_root: {
      minWidth: 275,
      marginBottom: "2%",
    },
    card_bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    card_title: {
      fontSize: 14,
    },
    card_pos: {
      marginBottom: 12,
    },
    scroll_grid: {
      height: "500px",
      overflowY: "scroll",
    },
    indicator: {
      backgroundColor: "white",
      color: "red",
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      }
  }));

  
export default function Usuarios(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    
    function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
    }

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    TabPanel.propTypes = {
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    };

    return(
            <Fragment>
                <AppBar position="static">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    className={classes.indicator}
                    >
                    <Tab label="Crear Usuario" {...a11yProps(0)} />
                    <Tab label="Listar/Buscar usuarios" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <FormularioUsuario/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <EnhancedTable/>
                </TabPanel>
            </Fragment>
    );
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
        {value === index && children}
      </div>
    );
  }
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'RestaurantUserID', numeric: true, disablePadding: false, label: 'Número de identificación'},
    { id: 'DocumentTypeID', numeric: false, disablePadding: true, label: 'Tipo de documento' },
    { id: 'RestaurantUserName', numeric: false, disablePadding: true, label: 'Nombre' },
    { id: 'RestaurantUserLastname', numeric: false, disablePadding: true, label: 'Apellido' },
    { id: 'RestaurantUserModDate', numeric: false, disablePadding: true, label: 'Fecha última modif' },
    { id:  'RestaurantUserCreationDate', numeric: false, disablePadding: true, label: 'Fecha de creación' },
  ];
  
  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"/>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {search, setSearch, filterCrit, setFilter} = props;
    const [opt, setOpt] = React.useState(filterCrit);
    const [searchAux, setSearchAux] = React.useState(search);
    const handleChange = (event) => {
      setSearch(event.target.value);
      setSearchAux(event.target.value);
    };

    const handleChangeSearch = (event) => {
      setOpt(event.target.value);
      setFilter(event.target.value);
    }
 
  const getFilter = (id) => {
      
    switch(id){
        
        case "RestaurantUserID":
          return "Id";
        case "DocumentTypeID":
          return "Tipo de doc";
        case "RestaurantUserName":
          return "Nombre";
        case "RestaurantUserLastname":
          return "Apellidos";
        case "RestaurantUserModDate":
          return "Por fecha de mod";
        case "RestaurantUserCreationDate":
          return "Por fecha creac";
        default:
          return "";           
      }
    }

    return (
      <Toolbar
        className={clsx(classes.root)}
      >
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            Tabla de usuarios del restaurante
          </Typography>
          <Grid container>
            <Grid item xs={6}>
            <TextField
                fullWidth
                id="standard-select-orderby"
                select
                value={opt}
                onChange={handleChangeSearch}
                label="Columna"
                >
                  {headCells.map((headCell) => (
                    <MenuItem key={headCell.id} value={headCell.id}>
                      {getFilter(headCell.id)}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
              fullWidth 
              id="standard-search-orderby" 
              label={"Buscar por "+getFilter(opt)} 
              type="search"
              value={searchAux}
              onChange={handleChange}
              />
            </Grid>
          </Grid>
      </Toolbar>
    );
  };
  
    
  function EnhancedTable() {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('RestaurantUserID');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [error, set_error] = React.useState(false);
    const [error_message, set_error_message] = useState("");
    const [success, set_success] = React.useState(false);
    const [success_message, set_success_message] = useState("");
    const [search, setSearch] = React.useState("");
    const [filterCrit, setFilter] = React.useState("RestaurantUserID");

    const vertical = "top";
    const horizontal = "right";

    useEffect(() => {
      fetch("http://localhost:4000/listUsers/50/0", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error) {
            set_error_message(response.error);
          }
          setRows(response);
        })
        .catch((error) => {
          alert(error);
        });
    }, []);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleClick = (event, userSelected) => {
      
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            search = {search}
            setSearch = {setSearch}
            filterCrit = {filterCrit}
            setFilter = {setFilter}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='medium'
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.length > 0?stableSort(search.length?rows.filter( x => x[filterCrit].toString().toUpperCase().includes(search.toUpperCase())):rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover={row.RestaurantUserStatus}
                        style={
                          row.RestaurantUserStatus ? { opacity: 1 } : { opacity: 0.5 }
                        }
                        onClick={(event) => handleClick(event, row)}
                        tabIndex={-1}
                        key={labelId+row.RestaurantUserID}
                      >
                        <TableCell padding="checkbox">
                        <IconButton
                            children={
                              <EditIcon/>
                            }
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {parseInt(row.RestaurantUserID)}
                        </TableCell>
                        <TableCell align="right">{row.DocumentTypeID}</TableCell>
                        <TableCell align="right">{row.RestaurantUserName}</TableCell>
                        <TableCell align="right">{row.RestaurantUserLastname}</TableCell>
                        <TableCell align="right">{new Date(row.RestaurantUserCreationDate).toLocaleDateString()}</TableCell>
                        <TableCell align="right">{new Date(row.RestaurantUserModDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  }):null}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <Snackbar
                open={error}
                autoHideDuration={2000}
                anchorOrigin={{ vertical, horizontal }}
                >
                <Alert
                onClose={() => set_error(false)}
                variant="filled"
                severity="error"
                >
                {error_message}
                </Alert>
                </Snackbar>
                <Snackbar
                open={success}
                autoHideDuration={2000}
                anchorOrigin={{ vertical, horizontal }}
                >
                <Alert
                onClose={() => set_success(false)}
                variant="filled"
                style={{ backgroundColor: "white", color: "black" }}
                >
                {success_message}
                </Alert>
         </Snackbar>
      </div>
    );
  }