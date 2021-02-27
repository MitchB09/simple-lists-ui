import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleListTable from './components/SimpleListTable';
import SimpleListsHeader from './components/Header/SimpleListsHeader';
import ListPage from './components/pages/ListPage';
import RandomPage from './components/pages/RandomPage';


function App() {
  const [darkState, setDarkState] = useState(true);
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
        <Box component="div" m={1} className="App">
          <SimpleListsHeader
            className="App-header"
            darkState={darkState}
            handleThemeChange={handleThemeChange}
          />
          <Box component="div" m={1} className="App-content">
            <Switch>
              <Route path="/:id/random" component={RandomPage} />
              <Route path="/:id" component={ListPage} />
              <Route path="/" component={SimpleListTable} />
            </Switch>
          </Box>
        </Box>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
