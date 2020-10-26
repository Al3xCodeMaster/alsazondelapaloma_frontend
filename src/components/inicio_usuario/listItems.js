import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {set_navbar} from '../../redux/actions';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Mi información" />
    </ListItem>
    <ListItem button component={Link} to='/admin/crear'>
      <ListItemIcon>
      <PersonAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Usuario" />
    </ListItem>
    <ListItem button component={Link} to='/admin/perfiles'>
      <ListItemIcon>
      <GroupAddIcon fontSize='medium'/>
      </ListItemIcon>
      <ListItemText primary="Perfiles" />
    </ListItem>
  </div>
);
