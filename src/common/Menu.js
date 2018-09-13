import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SignInIcon from '@material-ui/icons/Input';
import SignUpIcon from '@material-ui/icons/AssignmentInd';
import { Link, withRouter } from 'react-router-dom';
import MenuListHome from './MenuListHome';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};

class Menu extends Component {
  state = {
    menuOpen: false
  };

  handleMenuToggle = () => {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };

  handleMenuClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuOpen: false });
  };

  render() {
    const { history } = this.props;
    const { menuOpen } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={menuOpen ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleMenuToggle}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Popper open={menuOpen} anchorEl={this.anchorElement} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list"
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleMenuClose}>
                      <MenuListHome handleMenuClose={this.handleMenuClose} />
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Link to="/">
              <IconButton aria-label="Home" style={isActive(history, '/')}>
                <HomeIcon />
              </IconButton>
            </Link>
          </div>
          <Hidden xsDown>
            <Typography type="title" color="inherit">
              TECH TRAINING MARKETPLACE
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography type="title" color="inherit">
              TTM
            </Typography>
          </Hidden>
          <div style={{ position: 'absolute', right: '10px' }}>
            <span style={{ float: 'right' }}>
              <span>
                <Link to="/signup">
                  <Hidden xsDown>
                    <Button style={isActive(history, '/signup')}>Sign up</Button>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton aria-label="AssignmentInd" style={isActive(history, '/signup')}>
                      <SignUpIcon />
                    </IconButton>
                  </Hidden>
                </Link>
                <Link to="/signin">
                  <Hidden xsDown>
                    <Button style={isActive(history, '/signin')}>Sign In</Button>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton aria-label="Input" style={isActive(history, '/signin')}>
                      <SignInIcon />
                    </IconButton>
                  </Hidden>
                </Link>
              </span>
            </span>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Menu);
