import { Snackbar, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { List, ListProps } from '../../../types';
// mport styles from './ListEditPage.module.css';

interface ListEditProps extends ListProps {
  setList: (list: List) => void;
}

const ListEditPage = (props: ListEditProps) => {
  const { list, setList, updateList } = props;
  const [newItem, setNewItem] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  /*
  useEffect(() => {
    setTodoList(list.items as TodoItem[]);
  }, [list]);
*/
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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  /*
  const deleteItem = (deletedItem: TodoItem) => {
    if (deletedItem) {
      setTodoList((prevState) => prevState.filter((item) => item.id !== deletedItem.id));
    }
  };
*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateList(list);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.dir(err);
    }
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
                variant="outlined"
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
                variant="outlined"
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
                onClick={() => setOpen(true)}
                variant="outlined"
                style={{ ...cssStyle, marginBottom: '0.5em' }}
              >
                Test
              </Button>
            </Grid>
          </Paper>
        </form>
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
            backgroundColor: '#4caf50',
          }}
        >
          <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
            <Grid item>
              <CheckIcon />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" style={{ margin: 'auto' }}>
                This is a success message!
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
};

export default ListEditPage;
