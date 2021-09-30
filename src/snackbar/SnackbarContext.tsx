import React from 'react';

import { Color } from '@material-ui/lab/Alert';

interface SnackbarState {
  openSnackbar(message: string, severity?: Color): void;
  closeSnackbar(): void;
  isOpen: boolean;
  message: string;
  sevarity: string;
}

const SnackbarContext = React.createContext<SnackbarState>({
  openSnackbar: () => {},
  closeSnackbar: () => {},
  isOpen: false,
  message: '',
  sevarity: '',
});

export default SnackbarContext;
