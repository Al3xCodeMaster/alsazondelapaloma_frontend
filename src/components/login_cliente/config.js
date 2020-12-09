import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import makinola from "../../images/makinola.png";
import logo from "../../images/logo.png";
import Avatar from '@material-ui/core/Avatar';

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
          <MenuItem onClick={e => handleLinks(link.url, props.actionProvider)}>{link.text}</MenuItem>
    ));
  
    return <MenuList className={classes.linklist}>{linkMarkup}</MenuList>;
};

const CustomImages = (props) => {
  
  return <img src={makinola} alt="pana" />;
};

const handleLinks = (mess,acction) => {
  let message = createChatBotMessage("Aquí tengo la info "+mess,{widget: "initialLinks"});
  acction.updateChatbotState(message);
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
    botAvatar: (props) => <Avatar src={logo} {...props} />,
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
            text: "Plato del día",
            url:
              "foodOfTheDay",
            id: 1,
          },
          {
            text: "Horarios de restaurantes",
            url:
              "restSchedules",
            id: 2,
          },
          {
            text:"¿Lugar de algún restaurante?",
            url: "restPlaces",
            id: 3,
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

