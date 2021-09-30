import React from 'react';

import SnackbarContext from './SnackbarContext';

export function useSnackbar() {
  const { openSnackbar, closeSnackbar } = React.useContext(SnackbarContext);
  return { openSnackbar, closeSnackbar };
}

export function useClose() {
  return React.useContext(SnackbarContext);
}

export function useAlert() {
  return React.useContext(SnackbarContext).openSnackbar;
}

