import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleListTable from './components/SimpleListTable';
import SimpleListsHeader from './components/Header/SimpleListsHeader';
import RandomItem from './components/RandomItem/RandomItem';

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
        main: '#FFE400',
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
              <Route path="/:id/random" component={RandomItem} />
              <Route path="/">
                <SimpleListTable />
              </Route>
            </Switch>
          </Box>
        </Box>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
