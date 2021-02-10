import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import './App.css';
import { Box, Typography } from '@material-ui/core';
import SimpleListTable from './components/SimpleListTable';

function App() {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? 'dark' : 'light';
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box component="div" m={1} className="App">
        <header className="App-header">
          Simple Lists
          <Switch checked={darkState} onChange={handleThemeChange} />
        </header>
        <Box component="div" m={1} className="App-content">
          <SimpleListTable />
        </Box>
        <Box component="div" m={1} className="App-footer">
          <Typography variant="subtitle2">Footer</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
