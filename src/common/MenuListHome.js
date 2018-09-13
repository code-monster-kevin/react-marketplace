import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const MenuListHome = (props) => (
  <MenuList>
    <Link to="/mail">
      <MenuItem onClick={props.handleMenuClose}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText inset primary="Sent mail" />
      </MenuItem>
    </Link>
    <Link to="/drafts">
      <MenuItem onClick={props.handleMenuClose}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText inset primary="Drafts" />
      </MenuItem>
    </Link>
    <Link to="/inbox">
      <MenuItem onClick={props.handleMenuClose}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Inbox" />
      </MenuItem>
    </Link>
  </MenuList>
);

export default MenuListHome;
