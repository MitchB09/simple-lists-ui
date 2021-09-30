import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleListTable from './components/SimpleListTable';
import SimpleListsHeader from './components/Header/SimpleListsHeader';
import ListPage from './components/pages/ListPage';
import RandomPage from './components/pages/RandomPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import { useUser } from './auth/hooks';
import PublicListTable from './components/PublicListTable';
import PublicListPage from './components/pages/PublicListPage';

function App() {
  const [darkState, setDarkState] = useState(true);
  const user = useUser();
  const palletType = darkState ? 'dark' : 'light';
  const PublicContext = React.createContext(true);
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
        <Box component="div" m={1} className="App">
          <SimpleListsHeader
            className="App-header"
            darkState={darkState}
            handleThemeChange={handleThemeChange}
          />
          <Box component="div" m={1} className="App-content">
            {user ? (
              <PublicContext.Provider value={false}>
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/:id/random" component={RandomPage} />
                  <Route path="/:id/edit" component={ListPage} editing />
                  <Route path="/:id" component={ListPage} />
                  <Route path="/" component={SimpleListTable} />
                </Switch>
              </PublicContext.Provider>
            ) : (
              <PublicContext.Provider value>
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/:id" component={PublicListPage} />
                  <Route path="/" component={PublicListTable} />
                </Switch>
              </PublicContext.Provider>
            )}
          </Box>
        </Box>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
