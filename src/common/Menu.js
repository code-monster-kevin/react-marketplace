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
import SignOutIcon from '@material-ui/icons/ExitToApp';
import { Link, withRouter } from 'react-router-dom';
import MenuListHome from './MenuListHome';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

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
            <Popper
              open={menuOpen}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              style={{ zIndex: '100' }}
            >
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
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton aria-label="Home" style={isActive(history, '/')}>
                <HomeIcon />
              </IconButton>
            </Link>
          </div>
          <Hidden xsDown>
            <Typography type="title" color="inherit">
              MUI MARKETPLACE
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography type="title" color="inherit">
              TTM
            </Typography>
          </Hidden>
          <div style={{ position: 'absolute', right: '10px' }}>
            <span style={{ float: 'right' }}>
              {this.props.authenticated ? (
                <span>
                  <Hidden xsDown>
                    <Button
                      style={isActive(history, '/signout')}
                      onClick={() => this.props.signOut()}
                    >
                      Sign out
                    </Button>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton
                      aria-label="ExitToApp"
                      style={isActive(history, '/signout')}
                      onClick={() => this.props.signOut()}
                    >
                      <SignOutIcon />
                    </IconButton>
                  </Hidden>
                </span>
              ) : (
                <span>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Hidden xsDown>
                      <Button style={isActive(history, '/signup')}>Sign up</Button>
                    </Hidden>
                    <Hidden smUp>
                      <IconButton aria-label="AssignmentInd" style={isActive(history, '/signup')}>
                        <SignUpIcon />
                      </IconButton>
                    </Hidden>
                  </Link>
                  <Hidden xsDown>
                    <Button
                      style={isActive(history, '/signin')}
                      onClick={() => this.props.signIn()}
                    >
                      Sign In
                    </Button>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton
                      aria-label="Input"
                      style={isActive(history, '/signin')}
                      onClick={() => this.props.signIn()}
                    >
                      <SignInIcon />
                    </IconButton>
                  </Hidden>
                </span>
              )}
            </span>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Menu);
