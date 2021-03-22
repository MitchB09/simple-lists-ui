import React, { useEffect, useState } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useUser, useSignOut, useUpdateUser } from '../../auth/hooks';

interface ProfileAttributes {
  email: string;
  name?: string;
  family_name?: string;
}

function ProfilePage() {
  const user = useUser();
  const updateUser = useUpdateUser();
  const signOut = useSignOut();
  const history = useHistory();
  const [profileState, setProfileState] = useState<ProfileAttributes>({
    email: '',
  });

  useEffect(() => {
    if (user) {
      setProfileState(user as ProfileAttributes);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(profileState);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.dir(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      history.push('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.dir(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileState((prevState) => ({
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
          variant="outlined"
          style={{ minWidth: '50vw', backgroundColor: '#303030', margin: '1em', padding: '1em' }}
        >
          <form onSubmit={handleSubmit}>
            <Grid item>
              <TextField
                required
                name="email"
                label="Email"
                value={profileState.email}
                onChange={handleChange}
                style={{ ...cssStyle }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="name"
                label="First Name"
                value={profileState?.name ? profileState.name : ''}
                onChange={handleChange}
                style={{ ...cssStyle }}
              />
            </Grid>
            <Grid item>
              <TextField
                name="family_name"
                label="Last Name"
                value={profileState?.family_name ? profileState.family_name : ''}
                onChange={handleChange}
                style={{ ...cssStyle }}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Paper>
  );
}
export default ProfilePage;
