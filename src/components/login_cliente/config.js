import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import makinola from "../../images/makinola.png";
import logo from "../../images/logo.png";
import Avatar from '@material-ui/core/Avatar';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDcpnTaFMV5WjJULkv5HTKX5kHw7FeL8A4");
// set response language. Defaults to english.
Geocode.setLanguage("es");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
 

const useStyles = makeStyles((theme) => ({
 linklist: {
    padding: 0,
  },
  link_list_item: {
    textAlign: 'left',
    fontSize: '0.9rem',
  },
  link_list_item_url: {
    textDecoration: 'none',
    margin: '6px',
    display: 'block',
    color: '#1d1d1d',
    backgroundColor: '#f1f1f1',
    padding: '8px',
    borderRadius: '3px',
    boxShadow: '2px 2px 4px rgba(150, 149, 149, 0.4)'
  }  
}));

const LinkList = (props) => {
    const classes = useStyles();
    const linkMarkup = props.options.map((link) => (
          <MenuItem key={link.id} onClick={e => handleLinks(link.id, link.url, props.actionProvider)}>{link.text}</MenuItem>
    ));
  
    return <MenuList className={classes.linklist}>{linkMarkup}</MenuList>;
};

const CustomImages = (props) => {
  
  return <img src={makinola} alt="pana" />;
};

const handleLinks = (id, mess,action) => {
    let status;
    let promise;
    let respuesta="\n";
    let message
    switch (id) {
      case 4:
      fetch((process.env.REACT_APP_BACKEND || "http://localhost:4000/") + mess, {
        method: "GET",
      })
        .then((res) => {status=res.status; return status==204? []:res.json()})
        .then( async (response) => {
          if (response.length > 0) {
            for(var i=0;i<response.length;i++){
              promise = await request(response[i].RestaurantLatitude,response[i].RestaurantLongitude).then((value) => value.results[0].formatted_address)+"\n"; 
              respuesta += "<"+ response[i].RestaurantName +" - "+promise + ">"+ "\n"; 
            }
          }
          message = createChatBotMessage("Aquí tengo la info \n"+respuesta,{widget: "initialLinks"});
          action.updateChatbotState(message);
        })
        .catch((error) => {
          alert(error);
        });
        break;
      case 3:
        fetch((process.env.REACT_APP_BACKEND || "http://localhost:4000/") + mess, {
          method: "GET",
        })
          .then((res) => {status=res.status; return status==204? []:res.json()})
          .then((response) => {
            if (response.length > 0) {
              for(var i=0;i<response.length;i++){
                respuesta += response[i].CategoryID + ", "; 
              }
            }
            message = createChatBotMessage("Aquí tengo la info: \n"+respuesta,{widget: "initialLinks"});
            action.updateChatbotState(message);
          })
          .catch((error) => {
            alert(error);
          });
        break;
        case 1:
          fetch((process.env.REACT_APP_BACKEND || "http://localhost:4000/") + mess, {
          method: "GET",
          })
            .then((res) => {status=res.status; return status==204? []:res.json()})
            .then((response) => {
              if (response.length > 0) {
                for(var i=0;i<response.length;i++){
                  respuesta += (i+1)+") "+response[i].ProductID + "  "; 
                }
              }
              message = createChatBotMessage("Aquí tengo la info: \n"+respuesta,{widget: "initialLinks"});
              action.updateChatbotState(message);
            })
            .catch((error) => {
              alert(error);
            });
          break;
          case 2:
            fetch((process.env.REACT_APP_BACKEND || "http://localhost:4000/") + mess, {
          method: "GET",
          })
            .then((res) => {status=res.status; return status==204? []:res.json()})
            .then((response) => {
              if (response.length > 0) {
                for(var i=0;i<response.length;i++){
                  respuesta += (i+1)+") <"+response[i].DiscountName+", "+response[i].DiscountDescription+" Porcentaje: "+response[i].DiscountPercentage*100 + "% " + ">,  "; 
                }
              }
              message = createChatBotMessage("Aquí tengo la info: \n"+respuesta,{widget: "initialLinks"});
              action.updateChatbotState(message);
            })
            .catch((error) => {
              alert(error);
            });
          break;
      }      
}

const request = async (lat, long) => {
  
  const response = await Geocode.fromLatLng(lat, long);
  return response;
}

const config = {
  botName: "Atención al cliente",
  lang: "es",
  initialMessages: [
    createChatBotMessage("¡Hola!, que desea conocer de nuestro restaurante?", {
      widget: "initialLinks",
    }),
  ],
  customComponents: {
    botAvatar: (props) => <Avatar src={logo} {...props} />
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "initialLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Nuestros 5 mejores platos",
            url:
              "moreAmountProductsSalesChat",
            id: 1,
          },
          {
            text: "Nuestros descuentos",
            url:
              "availableDiscounts",
            id: 2,
          },
          {
            text:"Nuestros tipos de plato",
            url: "availableCategories",
            id: 3,
          },
          {
            text:"¿Lugar de algún restaurante?",
            url: "restaurantsAddresses",
            id: 4,
          },
        ],
      },
    },
    {
      widgetName: "panaeasteregg",
      widgetFunc: (props) => <CustomImages {...props} />,
      props: {
      },
    },
  ],
};

export default config;

