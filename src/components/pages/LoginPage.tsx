import { TextField, Paper, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/hooks';
import { SignInInput } from '../../auth/types';
import { useSnackbar } from '../../snackbar/hooks';

function LoginPage() {
  const auth = useAuth();
  const history = useHistory();
  const snackbar = useSnackbar();
  const [signInInput, setSignInInput] = useState<SignInInput>({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth
      .signIn({ username: signInInput.username, password: signInInput.password })
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        snackbar.addError(err.message);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const startSignUp = () => {
    auth
      .signUp({ username: signInInput.username, password: signInInput.password })
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        snackbar.addError(err.message);
      });
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
                name="username"
                label="Username"
                value={signInInput?.username ? signInInput.username : ''}
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
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
                onClick={startSignUp}
              >
                Sign Up
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
    </Paper>
  );
}
export default LoginPage;
