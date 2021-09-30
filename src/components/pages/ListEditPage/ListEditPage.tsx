import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import api from '../../../api';
import { useSnackbar } from '../../../snackbar/hooks';
import { List, ListProps } from '../../../types';
// import styles from './ListEditPage.module.css';

interface RouteInfo {
  id: string;
}

interface ListEditProps extends ListProps {
  setList: (list: List) => void;
}

const ListEditPage = (props: ListEditProps) => {
  const { list, setList, updateList } = props;
  const [newItem, setNewItem] = useState<string>('');
  const { id } = useParams<RouteInfo>();
  const snackbar = useSnackbar();

  const createItem = () => {
    if (setNewItem) {
      const newTodo = { id: uuidv1(), value: newItem };
      if (list.items) {
        list.items = [...list.items, newTodo];
      } else {
        list.items = [newTodo];
      }
      setList(list);
      setNewItem('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newList = { ...list, [name]: value };
    setList(newList);
  };

  const handleItemChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedItem = { id: name, value };
    const newList = { ...list }; // copying the old datas array

    if (newList.items && newList.items[index]) {
      newList.items[index] = updatedItem;
      setList(newList);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateList(list);
  };

  const publishList = () => {
    api
      .post<List>(`/lists/${id}/publish`, list)
      .then(() => {
        snackbar.addSuccess('Successfully Published List');
      })
      .catch((err) => {
        snackbar.addError(`Error Publishing List: ${err.message}`);
      });
  };

  const cssStyle = {
    minWidth: '16em',
    marginBottom: '1em',
  };

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <Paper
            color="primary"
            style={{ minWidth: '50vw', backgroundColor: '#303030', margin: '1em' }}
          >
            <Grid item>
              <TextField
                name="name"
                label="Name"
                value={list.name}
                onChange={handleChange}
                style={{ minWidth: '20em', marginTop: '0.5em', marginBottom: '0.5em' }}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="description"
                label="Description"
                value={list.description}
                onChange={handleChange}
                style={{ minWidth: '20em', marginBottom: '1.5em' }}
              />
            </Grid>
            {list.items &&
              list.items.map((item, index) => (
                <Grid item key={item.id}>
                  <TextField
                    value={item.value}
                    onChange={handleItemChange(index)}
                    style={{ minWidth: '20em', marginBottom: '0.5em' }}
                  />
                </Grid>
              ))}
            <Grid item>
              <TextField
                value={newItem}
                onChange={(e) => {
                  setNewItem(e.target.value);
                }}
                label="new item"
                style={{ minWidth: '20em', marginBottom: '0.5em' }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      style={{ padding: '4px' }}
                      onClick={() => {
                        createItem();
                      }}
                      color="inherit"
                    >
                      <Add />
                    </IconButton>
                  ),
                }}
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
            {list.id && (
              <Grid item>
                <Button
                  variant="outlined"
                  style={{ ...cssStyle, marginBottom: '0.5em' }}
                  onClick={() => {
                    publishList();
                  }}
                >
                  Publish
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                component={Link}
                variant="outlined"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
                to="/"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
                onClick={() => {
                  snackbar.addSuccess(`Snackbar test: ${new Date().getMilliseconds()}`);
                }}
              >
                Snackbar Test
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Paper>
  );
};

export default ListEditPage;
