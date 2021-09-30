import {
  TextField,
  Paper,
  Button,
  Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSignIn } from '../../auth/hooks';
import { SignInInput } from '../../auth/types';
import { useSnackbar } from '../../snackbar/hooks';

function LoginPage() {
  const signIn = useSignIn();
  const history = useHistory();
  const [signInInput, setSignInInput] = useState<SignInInput>({ email: '', password: '' });
  const snackbar = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email: signInInput.email, password: signInInput.password })
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        snackbar.openSnackbar(err.message, 'error');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    </Paper>
  );
}
export default LoginPage;
