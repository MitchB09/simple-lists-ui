import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Alert, { Color } from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import SnackbarContext from './SnackbarContext';

interface SnackbarProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProps) => {
  const [message, setMessage] = useState<string>('');
  const [sevarity, setSevarity] = useState<Color>('success');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSnackbar = (_message: string, _sevarity: Color = 'success') => {
    setMessage(_message);
    setSevarity(_sevarity);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setMessage('');
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        closeSnackbar,
        isOpen,
        message,
        sevarity,
      }}
    >
      {children}
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Alert
          severity={sevarity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
