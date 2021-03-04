import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthorize, authorizeInitialState } from '../../../providers/authorize-provider/AuthorizeProvider'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 200px;
  padding: 5px 10px;
`

export default function RightNavbar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false)
  // @ts-ignore
  const { authorize: { authorizeToken, backendUserId }, setAuthorize } = useAuthorize()
  console.log('### authorizeToken', authorizeToken)

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const handleLogOutClick = () => {
    // @ts-ignore
    setAuthorize(authorizeInitialState)
    localStorage.clear()
  }

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {authorizeToken && (
          <>
            <StyledNavLink to={`/my-games`}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'my games'} />
            </StyledNavLink>
            <div onClick={() => handleLogOutClick()}>
              log out
            </div> 
          </>
        )}
        {!authorizeToken && (
          <StyledNavLink to='/log-in'>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'log in'} />
          </StyledNavLink>
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key='right'>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon />
          </Button>
          <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
