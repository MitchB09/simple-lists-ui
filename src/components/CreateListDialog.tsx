import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from '@material-ui/core';

import { List, ListTypes } from '../types';
import api from '../api';

interface CreateListDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateListDialog(props: CreateListDialogProps) {
  const { open, onClose } = props;
  const [list, setList] = useState<List>({} as List);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const listTypes = [
    {
      value: ListTypes.RandomList,
      label: 'Random Item Picker',
    },
    {
      value: ListTypes.TimedRandomList,
      label: 'Timed Random Item',
    },
    {
      value: ListTypes.TodoList,
      label: 'To-Do List',
    },
  ];

  const createList = (createdList: List) => {
    api
      .post<List>('/lists', createdList)
      .then(({ data }) => {
        history.push(`/${data.id}/edit`);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.dir(error);
        // TODO snackbar
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createList(list);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Add List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="List Name"
            fullWidth
            required
            value={list?.name ? list.name : ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            required
            value={list?.description ? list.description : ''}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            id="type"
            name="type"
            label="Type"
            fullWidth
            required
            value={list?.type ? list.type : ''}
            onChange={handleChange}
          >
            {listTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
