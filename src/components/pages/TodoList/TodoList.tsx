import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { ListProps, TodoItem } from '../../../types';
import styles from './TodoList.module.css';

interface TodoItemProps {
  item: TodoItem;
  onClick: () => void;
  onDelete: () => void;
}

const TodoListItem = (props: TodoItemProps) => {
  const { item, onClick, onDelete } = props;

  const button = {
    minWidth: '20em',
  };

  const completed = {
    ...button,
    textDecoration: 'line-through',
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={item.complete}
                onClick={onClick}
                // color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={item.value}
            className={styles.itemContainer}
            style={item.complete ? completed : button}
          />
        </Grid>
        <Grid item className={styles.grow} />
        {item.complete && (
          <IconButton onClick={onDelete}>
            <Close />
          </IconButton>
        )}
      </Grid>
    </>
  );
};

const TodoList = (props: ListProps) => {
  const { list, updateList } = props;
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [completeList, setCompleteList] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    if (list.items) {
      const items = list.items as TodoItem[];
      setTodoList(items.filter((item) => !item.complete));
      setCompleteList(items.filter((item) => item.complete));
    }
  }, [list]);

  const createItem = () => {
    if (setNewItem) {
      const newTodo = { id: uuidv1(), value: newItem, complete: false };
      setTodoList((prevState) => [...prevState, newTodo]);
      setNewItem('');
    }
  };

  const toggleComplete = (toggledItem: TodoItem) => {
    if (toggledItem.complete) {
      setCompleteList((prevState) => prevState.filter((item) => item.id !== toggledItem.id));
      setTodoList((prevState) => [...prevState, { ...toggledItem, complete: false }]);
    } else {
      setTodoList((prevState) => prevState.filter((item) => item.id !== toggledItem.id));
      setCompleteList((prevState) => [...prevState, { ...toggledItem, complete: true }]);
    }
  };

  const deleteItem = (deletedItem: TodoItem) => {
    if (deletedItem) {
      setTodoList((prevState) => prevState.filter((item) => item.id !== deletedItem.id));
      setCompleteList((prevState) => prevState.filter((item) => item.id !== deletedItem.id));
    }
  };

  const updateTodoList = () => {
    try {
      list.items = [...todoList, ...completeList];
      updateList(list);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.dir(err);
    }
  };

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper
          color="primary"
          style={{ minWidth: '30vw', padding: '1em', backgroundColor: '#303030', margin: '1em' }}
        >
          <Typography variant="h6">{list?.name}</Typography>
          <Grid item>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                createItem();
              }}
            >
              <Grid container direction="row" justify="center" alignItems="flex-start">
                <Grid item>
                  <TextField
                    value={newItem}
                    onChange={(e) => {
                      setNewItem(e.target.value);
                    }}
                    label="new item"
                    style={{ minWidth: '20em' }}
                  />
                </Grid>
                <Grid item className={styles.grow} />
                <Grid item>
                  <IconButton
                    onClick={() => {
                      createItem();
                    }}
                    color="inherit"
                  >
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {todoList &&
            todoList.map((item) => (
              <Grid item>
                <TodoListItem
                  key={item.id}
                  item={item}
                  onClick={() => {
                    toggleComplete(item);
                  }}
                  onDelete={() => {
                    deleteItem(item);
                  }}
                />
              </Grid>
            ))}
          {completeList.map((item) => (
            <Grid item>
              <TodoListItem
                key={item.id}
                item={item}
                onClick={() => {
                  toggleComplete(item);
                }}
                onDelete={() => {
                  deleteItem(item);
                }}
              />
            </Grid>
          ))}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ minWidth: '16em', marginBottom: '1em' }}
              onClick={() => {
                updateTodoList();
              }}
            >
              Update
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Paper>
  );
};

export default TodoList;
