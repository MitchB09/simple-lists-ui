import { TextField, Paper, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSignIn } from '../Auth/hooks';
import { SignInInput } from '../Auth/types';

function LoginPage() {
  const signIn = useSignIn();
  const history = useHistory();
  const [signInInput, setSignInInput] = useState<SignInInput>({ email: '', password: '' });

  // a handler for when the user clicks the "login" button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn({ email: signInInput.email, password: signInInput.password });
      history.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.dir(err);
    }
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
