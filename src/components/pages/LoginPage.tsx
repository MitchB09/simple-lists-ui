import {
  TextField,
  Paper,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { useSignIn } from '../../auth/hooks';
import { SignInInput } from '../../auth/types';

function LoginPage() {
  const signIn = useSignIn();
  const history = useHistory();
  const [signInInput, setSignInInput] = useState<SignInInput>({ email: '', password: '' });
  const [errorText, setErrorText] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email: signInInput.email, password: signInInput.password })
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        setErrorText(err.message);
        setOpen(true);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const cssStyle = {
    minWidth: '16em',
    marginBottom: '1em',
  };

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper
          color="primary"
          style={{ minWidth: '50vw', backgroundColor: '#303030', margin: '1em', padding: '1em' }}
        >
          <form onSubmit={handleSubmit}>
            <Grid item>
              <TextField
                required
                name="email"
                label="Email"
                value={signInInput?.email ? signInInput.email : ''}
                onChange={handleChange}
                style={{ ...cssStyle }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={signInInput?.password ? signInInput.password : ''}
                onChange={handleChange}
                style={{ ...cssStyle }}
                autoComplete="current-password"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" style={{ ...cssStyle, marginBottom: '0.5em' }}>
                Cancel
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <Paper
          style={{
            height: '3em',
            margin: '10px',
            textAlign: 'center',
            padding: '10px',
            color: '#fff',
            backgroundColor: '#f44336',
          }}
        >
          <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
            <Grid item>
              <ErrorIcon />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" style={{ margin: 'auto' }}>
                {errorText}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => setOpen(false)}
                style={{ padding: '0px', marginLeft: '12px' }}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Snackbar>
    </Paper>
  );
}
export default LoginPage;
