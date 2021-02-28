import React, { useEffect, useState } from 'react';
import { Paper, Grid, TextField } from '@material-ui/core';
import { useUser } from '../../auth/hooks';

interface ProfileState {
  email?: string;
  name?: string;
  family_name?: string;
}

function ProfilePage() {
  const user = useUser();
  const [profileState, setProfileState] = useState<ProfileState>({
    email: '',
    name: '',
    family_name: '',
  });

  useEffect(() => {
    if (user) {
      setProfileState(user as ProfileState);
    }
  }, [user]);

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
          style={{ minWidth: '50vw', backgroundColor: '#303030', margin: '1em', padding: '1em' }}
        >
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
              value={profileState.name}
              onChange={handleChange}
              style={{ ...cssStyle }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="family_name"
              label="Last Name"
              value={profileState.family_name}
              onChange={handleChange}
              style={{ ...cssStyle }}
            />
          </Grid>
        </Paper>
      </Grid>
    </Paper>
  );
}
export default ProfilePage;
