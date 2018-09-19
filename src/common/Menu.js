import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import SignInIcon from '@material-ui/icons/Input';
import SignUpIcon from '@material-ui/icons/AssignmentInd';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import { Link, withRouter } from 'react-router-dom';
import MenuListHome from './MenuListHome';
import FlagUSIcon from '../assets/flags/FlagUSIcon';
import FlagCNIcon from '../assets/flags/FlagCNIcon';

const messages = defineMessages({
  menuTitleSm: {
    id: 'menu.title.sm',
    defaultMessage: 'MUI Marketplace'
  },
  menuTitleXs: {
    id: 'menu.title.xs',
    defaultMessage: 'MUI'
  },
  menuSignOut: {
    id: 'menu.signout',
    defaultMessage: 'Sign Out'
  },
  menuSignIn: {
    id: 'menu.signin',
    defaultMessage: 'Sign In'
  },
  menuSignUp: {
    id: 'menu.signup',
    defaultMessage: 'Sign Up'
  }
});

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: localStorage.getItem('app.locale') || 'en',
      menuOpen: false,
      localeOpen: false,
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

  handleLocaleOpen = () => {
    this.setState({ localeOpen: true });
  };

  handleLocaleClose = () => {
    this.setState({ localeOpen: false });
  };

  handleLocaleChange = (event) => {
    console.log(event.target.value);
    localStorage.setItem('app.locale', event.target.value);
    this.setState({ locale: event.target.value });
    this.handleLocaleClose();
  };

  render() {
    const { history, intl : { formatMessage } } = this.props;
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
              {formatMessage(messages.menuTitleSm)}
            </Typography>
          </Hidden>
          <Hidden smUp>
            <Typography type="title" color="inherit">
              {formatMessage(messages.menuTitleXs)}
            </Typography>
          </Hidden>
          <div style={{ position: 'absolute', right: '10px' }}>
            <span style={{ float: 'right' }}>
              <IconButton onClick={this.handleLocaleOpen}>
                {(this.state.locale==='zh') ?
                  <FlagCNIcon />
                  :
                  <FlagUSIcon />
                }
              </IconButton>
              <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.localeOpen}
              onClose={this.handleLocaleClose}
              >
                <DialogTitle>Select Language</DialogTitle>
                <DialogContent>
                  <form>
                    <FormControl>
                      <Select
                        value={this.state.locale}
                        onChange={this.handleLocaleChange}
                      >
                        <MenuItem value='en'><FlagUSIcon />{' '}English</MenuItem>
                        <MenuItem value='zh'><FlagCNIcon />{' '}中文</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                  <DialogActions>
                    <Button onClick={this.handleLocaleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              {this.props.authenticated ? (
                <span>
                  <Hidden xsDown>
                    <Button
                      style={isActive(history, '/signout')}
                      onClick={() => this.props.signOut()}
                    >
                      {formatMessage(messages.menuSignOut)}
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
                      <Button style={isActive(history, '/signup')}>{formatMessage(messages.menuSignUp)}</Button>
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
                      {formatMessage(messages.menuSignIn)}
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

export default injectIntl(withRouter(Menu));
