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
import { useSnackbar } from '../snackbar/hooks';

interface CreateListDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateListDialog(props: CreateListDialogProps) {
  const { open, onClose } = props;
  const [list, setList] = useState<List>({} as List);
  const history = useHistory();
  const snackbar = useSnackbar();

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
        history.push(`/user/${data.id}/edit`);
        snackbar.addSuccess('Updated List Successfully');
      })
      .catch((err) => {
        snackbar.addError(`Error Creating List: ${err.message}`);
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
            Create a new simple list! Either a Random Item Picker (selectes a random item from a
            your predefined list), a Timed Random Item (picks a new item to be completed every 5,
            15, or 30 minutes), or a To-Do List. After creation, you&apos;ll be redirected to a page
            for populating your list.
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
