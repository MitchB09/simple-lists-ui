import { TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
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
      {item.complete && (
        <IconButton onClick={onDelete}>
          <Close />
        </IconButton>
      )}
    </>
  );
};

const TodoList = (props: ListProps) => {
  const { list, updateList } = props;
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [completeList, setCompleteList] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    setTodoList(list.items as TodoItem[]);
  }, [list]);

  const createItem = () => {
    if (setNewItem) {
      const newTodo = { id: uuidv1(), value: newItem, complete: false };
      setTodoList((prevState) => [...prevState, newTodo]);
      list.items = [...todoList, newTodo, ...completeList];
      updateList(list);
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
    }
  };

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper
          color="primary"
          style={{ minWidth: '50vw', backgroundColor: '#303030', margin: '1em' }}
        >
          <Typography variant="h6">{list?.name}</Typography>
          <Grid item>
            <span style={{ padding: '1em' }}>
              <TextField
                value={newItem}
                onChange={(e) => {
                  setNewItem(e.target.value);
                }}
                label="new item"
                style={{ minWidth: '20em' }}
              />
              <IconButton
                onClick={() => {
                  createItem();
                }}
                color="inherit"
              >
                <Add />
              </IconButton>
            </span>
          </Grid>
          {todoList.map((item) => (
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
          <Divider />
          {completeList.map((item) => (
            <Grid item>
              <TodoListItem
                key={item.id}
                item={item}
                onClick={() => {
                  toggleComplete(item);
                }}
                onDelete={() => {
                  console.dir(item);
                }}
              />
            </Grid>
          ))}
        </Paper>
      </Grid>
    </Paper>
  );
};

export default TodoList;
