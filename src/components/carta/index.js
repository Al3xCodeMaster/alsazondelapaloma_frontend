import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { success_login, error_login } from "../../redux/actions";
import { withRouter, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppBarActions from "../login_cliente/appBar";
//SELECT RESTAURANT
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//SLIDE
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
//ICONS
import SearchIcon from "@material-ui/icons/Search";
//DIALOGS
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//BUTTONS
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//CARDS
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
//DIVIDER
import Divider from "@material-ui/core/Divider";
//CHECKBOX
import Checkbox from "@material-ui/core/Checkbox";
//ACTIONS
import {
  save_products,
  change_restaurant,
} from "../../redux/actions";

//SLIDE
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [
  {
    value: 0,
  },
  {
    value: 10000,
  },
  {
    value: 50000,
  },
  {
    value: 100000,
  },
];

const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

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
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Carta = () => {
  const { usuario } = useSelector((state) => ({
    usuario: state.redux_reducer.usuario,
  }));
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurantID, setRestaurantID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [filterCategories, setFilterCategories] = useState([]);
  //redux
  const dispatch = useDispatch();
  const classes = useStyles();
  //error
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //Ref
  const ref = useRef();

  React.useEffect(() => {
    fetch(
      (process.env.REACT_APP_BACKEND || "http://localhost:4000/") +
        "listRestaurantsToClient",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setRestaurants(response);
      })
      .catch((err) => console.log(err));

    fetch(
      (process.env.REACT_APP_BACKEND || "http://localhost:4000/") +
        "getAllActiveCategories",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => console.log(err));
  }, []);

  //Get Preview
  const getPreview = () => {
    let temp = filterCategories;
    let filter = temp.filter((element) => element.checked === true);
    let requestItems = [];
    for (let i = 0; i < filter.length; i++) {
      requestItems.push({
        BillId: 0,
        RestaurantProductID: filter[i].ProductID,
        Amount: filter[i].Amount,
      });
    }
    let status = 500;
    fetch(
      (process.env.REACT_APP_BACKEND || "http://localhost:4000/") +
        "getReceiptPreview",
      {
        method: "POST",
        body: JSON.stringify(requestItems), // data can be `string` or {object}!
      }
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((response) => {
        if (status !== 200) {
          alert("error");
        } else {
          alert(JSON.stringify(response));
        }
      })
      .catch((error) => alert("Error con la conexión al servidor " + error));
  };
  //Select Product
  const selectedProduct = (item) => {
    let temp = filterCategories;

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].RestaurantProductID === item.RestaurantProductID) {
        temp[i].checked = !temp[i].checked;
      }
    }
    setFilterCategories(temp);
    dispatch(save_products(temp));
  };
  //Filter Products
  const filterProducts = () => {
    let status = 500;
    setFilterCategories([]);
    if (restaurantID == "" || categoryID == "" || maxPrice <= 0) {
      if (restaurantID == "") {
        setError(true);
        setMessage("Debe seleccionar una opción de restaurante");
      } else if (categoryID == "") {
        setError(true);
        setMessage("Debe seleccionar una opción en categoria");
      } else {
        setError(true);
        setMessage("El precio debe ser mayor a 0");
      }
    } else {
      fetch(
        (process.env.REACT_APP_BACKEND || "http://localhost:4000/") +
          "getAllProductsRestaurant/" +
          restaurantID +
          "/" +
          categoryID +
          "/0/" +
          maxPrice +
          "",
        {
          method: "GET",
        }
      )
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((response) => {
          if (status !== 200) {
            setError(true);
            setMessage(response.Message);
          } else {
            let temp = [];
            for (let i = 0; i < response.length; i++) {
              let element = response[i];
              element.checked = false;
              element.Amount = 1;
              temp.push(element);
            }
            setFilterCategories(temp);
          }
        })
        .catch((error) =>
          console.log("Error con la conexión al servidor " + error)
        );
    }
  };
  const changeRestaurantAux = (e) => {
    setRestaurantID(e.target.value);
    dispatch(change_restaurant(e.target.value));
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBarActions />
      <br />
      <br />
      <Grid container style={{ marginBottom: "2%" }} spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <br />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="restaurantsId">Seleccionar Restaurante</InputLabel>
            <Select
              labelId="restaurantsId"
              id="selectRestaurants"
              value={restaurantID}
              onChange={(e) => changeRestaurantAux(e)}
            >
              {restaurants.map((item, key) => {
                return (
                  <MenuItem value={item.RestaurantID} key={key}>
                    {item.RestaurantName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <br />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="categoryID">Seleccionar Categoria</InputLabel>
            <Select
              labelId="categoryID"
              id="selectcategoryID"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            >
              {categories.map((item, key) => {
                return (
                  <MenuItem value={item.CategoryID} key={key}>
                    {item.CategoryID}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.root} style={{ marginLeft: "5%" }}>
            <Typography gutterBottom>Seleccionar Precio</Typography>
            <br />
            <IOSSlider
              max={100000}
              name={"Seleccionar Precio"}
              aria-label="ios slider"
              defaultValue={50000}
              value={maxPrice}
              marks={marks}
              valueLabelDisplay="on"
              onChange={(e, val) => setMaxPrice(val)}
            />
          </div>
        </Grid>
        <Grid item xs={1}>
          <br />
          <IconButton
            aria-label="BUSCAR"
            style={{ marginLeft: "50%" }}
            onClick={() => filterProducts()}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Divider />
      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
        <Grid container style={{ marginBottom: "2%" }} spacing={2}>
          {filterCategories.map((item, key) => {
            return (
              <Grid item xs={4} key={key}>
                <Card className={classes.rootCard}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {item.RestaurantProductID}
                      </Avatar>
                    }
                    action={
                      <Checkbox
                        onChange={(e) => selectedProduct(item)}
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    title={item.ProductID}
                    subheader={(item.ProductPrice).toLocaleString('en-US', {style: 'currency',currency: 'USD',})}
                  />
                  <CardMedia
                    className={classes.media}
                    image={
                      (process.env.REACT_APP_BACKEND ||
                        "http://localhost:4000/") +
                      "getPictureProducts/" +
                      item.ProductPicture
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.ProductDescription}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing></CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>

      <Dialog
        open={error}
        onClose={() => setError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: "#8f6b00", textAlign: "center" }}
        >
          {"Información"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setError(false)}
            color="primary"
            variant="outlined"
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default Carta;
