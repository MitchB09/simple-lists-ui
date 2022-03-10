import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleListsHeader from './components/Header/SimpleListsHeader';
import ListPage from './components/pages/ListPage';
import RandomPage from './components/pages/RandomPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import { useUser } from './auth/hooks';
import PublicListTable from './components/PublicListTable';
import SimpleListTable from './components/SimpleListTable';
import SnackbarProvider from './snackbar/SnackbarProvider';

function App() {
  const [darkState, setDarkState] = useState(true);
  const user = useUser();
  const palletType = darkState ? 'dark' : 'light';
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: '#14A763',
      },
      secondary: {
        main: '#737373',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <Router>
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <Box component="div" m={1} className="App">
            <SimpleListsHeader
              className="App-header"
              darkState={darkState}
              handleThemeChange={handleThemeChange}
            />
            <Box component="div" m={1} className="App-content">
              {user ? (
                <Switch>
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/profile" exact component={ProfilePage} />
                  <Route path="/user/:id/random" component={RandomPage} />
                  <Route path="/user/:id/edit" render={() => <ListPage editMode />} />
                  <Route path="/user/:id" component={ListPage} />
                  <Route path="/user" component={SimpleListTable} />
                  <Route path="/:id/random" render={() => <RandomPage publicList />} />
                  <Route path="/:id" render={() => <ListPage publicList />} />
                  <Route path="/" component={PublicListTable} />
                </Switch>
              ) : (
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/:id/random" render={() => <RandomPage publicList />} />
                  <Route path="/:id" render={() => <ListPage publicList />} />
                  <Route path="/" component={PublicListTable} />
                </Switch>
              )}
            </Box>
          </Box>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
