import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { useUser } from '../../auth/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'block',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);

export default function PrimarySearchAppBar(props: any) {
  const { darkState, handleThemeChange } = props;
  const classes = useStyles();
  const user = useUser();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/profile">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/login">
          <IconButton color="inherit">
            <AccountCircleOutlined />
          </IconButton>
          <Typography
            className={classes.title}
            style={{ textDecoration: 'none', color: 'inherit' }}
            // variant="h6"
            noWrap
          >
            Login
          </Typography>
        </MenuItem>
      )}
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/">
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <Typography
          className={classes.title}
          style={{ textDecoration: 'none', color: 'inherit' }}
          // variant="h6"
          noWrap
        >
          Home
        </Typography>
      </MenuItem>
      <MenuItem>
        <Switch checked={darkState} onChange={handleThemeChange} />
        <p>Dark Mode</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            style={{ textDecoration: 'none', color: 'inherit' }}
            variant="h6"
            noWrap
          >
            Simple Lists
          </Typography>
          {user && (
            <Typography
              component={Link}
              to="/user"
              className={classes.title}
              style={{ textDecoration: 'none', marginLeft: '1.5em', color: 'inherit' }}
              variant="subtitle1"
              noWrap
            >
              My Lists
            </Typography>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Switch checked={darkState} onChange={handleThemeChange} />
            {user ? (
              <IconButton edge="end" color="inherit" component={Link} to="/profile">
                <AccountCircle />
              </IconButton>
            ) : (
              <IconButton edge="end" color="inherit" component={Link} to="/login">
                <AccountCircleOutlined />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
