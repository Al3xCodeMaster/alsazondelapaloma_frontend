import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Done from "@material-ui/icons/Done";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  rootContainer: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Products() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [productID, set_productID] = React.useState("");
  const [productDesc, set_productDesc] = React.useState("");
  const [productPrice, set_productPrice] = React.useState(0);
  const [productPic, set_productPic] = React.useState("");
  const [error_price, set_error_price] = React.useState(false);
  const [error_ID, set_error_ID] = React.useState(false);
  const [error_desc, set_error_desc] = React.useState(false);
  const [error_pic, set_error_pic] = React.useState(false);
  const [error, set_error] = React.useState(false);
  const [success, set_success] = React.useState(false);
  const [message, set_message] = React.useState("");
  const { usuario } = useSelector((state) => ({
    usuario: state.redux_reducer.usuario,
  }));
  const dispatch = useDispatch();
  const [products, setProds] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/GetAllProducts', {
        method: 'GET'
    }).then(res => res.json())
        .then(response => {
            if(response.length > 0){
                setProds(response);
            }
        })
        .catch(error => {
            alert(error);
  })}, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const checkFields = () => {
    set_error_ID(false);
    set_error_desc(false);
    set_error_price(false);
    set_error_pic(false);
    set_message("");
    set_error(false);
    if (productID == "") {
      set_error(true);
      set_error_ID(true);
      set_message("El ID del producto no puede estar vacio");
    } else if (productDesc == "") {
      set_error(true);
      set_error_desc(true);
      set_message("La descripción no puede estar vacia");
    } else if (productPrice <= 0) {
      set_error(true);
      set_error_price(true);
      set_message("El precio debe ser mayor a cero");
    } else if (productPic == "") {
      set_error(true);
      set_error_pic(true);
      set_message("Seleccione una foto válida");
    } else {
        createProduct()
    }
    console.log(message);
  };
  const createProduct = () => {
      var formData = new FormData();
      formData.append("photo", productPic);
      formData.append(
        "productInfo",
        JSON.stringify({
            "ProductID": productID,
            "ProductDescription": productDesc,
            "ProductPrice": parseFloat(productPrice)
        })
      );
      fetch("http://localhost:4000/createProduct", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400) {
            set_message(response.message);
            set_error(true);
          } else {
            set_message("Se creó el producto con éxito!");
            set_success(true);
            set_productID("");
            set_productDesc("");
            set_productPrice(0);
            set_productPic("")
            set_error(false);
            set_error_ID(false);
            set_error_desc(false);
            set_error_price(false);
            set_productPic(false);
          }
        })
        .catch((error) => {
          set_message(error);
          set_error(true);
        });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Crear Producto" {...a11yProps(0)} />
          <Tab label="Listar Productos" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Dialog
            open={error}
            onClose={() => set_error(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
              {"Información:"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => set_error(false)}
                color="primary"
                variant="outlined"
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={success}
            onClose={() => set_success(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ color: "green" }}>
              {"Información:"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => set_success(false)}
                color="primary"
                variant="outlined"
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
          <form>
            <div>
              <Grid container className={classes.rootContainer} spacing={4}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    error={error_ID}
                    value={productID}
                    onChange={(e) => set_productID(e.target.value)}
                    id="product_id"
                    label="ID del Producto"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="product_desc"
                    label="Descripción"
                    error={error_desc}
                    multiline
                    value={productDesc}
                    onChange={(e) => set_productDesc(e.target.value)}
                    rowsMax={4}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputLabel htmlFor="product_price">Precio</InputLabel>
                  <Input
                    fullWidth
                    error={error_price}
                    value={productPrice}
                    onChange={(e) => set_productPrice(e.target.value)}
                    id="product_price"
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    accept="image/*"
                    id="raised-button-file"
                    style={{ display: "none" }}
                    onChange={(e) => set_productPic(e.target.files[0])}
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PhotoCamera />}
                      component="span"
                    >
                      Subir Foto
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    onClick={checkFields}
                    variant="contained"
                    endIcon={<Done />}
                    style={{ color: "white", background: "green" }}
                  >
                    Registrar Producto
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {products.length>0?products.map((card) => (
                <Grid item key={card.ProductID} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={"http://localhost:4000/GetPictureProducts/"+card.ProductPicture}
                      title={card.ProductID}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.ProductID}
                      </Typography>
                      <Typography>
                        {card.ProductDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <IconButton aria-label="eliminar-producto">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="editar-producto">
                      <EditIcon />
                    </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              )):null}
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
