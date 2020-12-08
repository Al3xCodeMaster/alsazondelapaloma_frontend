import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

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
          <MenuItem>{link.text}</MenuItem>
    ));
  
    return <MenuList className={classes.linklist}>{linkMarkup}</MenuList>;
  };

const config = {
  botName: "Atención al cliente",
  initialMessages: [
    createChatBotMessage("¡Hola!, que desea conocer de nuestro restaurante?", {
      widget: "javascriptLinks",
    }),
  ],
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
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Plato del día",
            url:
              "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Horarios de restaurantes",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text:"¿Lugar de algún restaurante?",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
  ],
};

export default config;

