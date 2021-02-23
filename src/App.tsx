import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import SimpleListTable from './components/SimpleListTable';
import SimpleListsHeader from './components/SimpleListsHeader';

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
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box component="div" m={1} className="App">
        <SimpleListsHeader
          className="App-header"
          darkState={darkState}
          handleThemeChange={handleThemeChange}
        />
        <Box component="div" m={1} className="App-content">
          <SimpleListTable />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
