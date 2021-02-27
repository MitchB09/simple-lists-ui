import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { List, ListItem, TodoItem } from '../../../types';
import styles from './TodoList.module.css';

interface TodoItemProps {
  item: ListItem;
  onDelete: () => void;
}

const TodoListItem = (props: TodoItemProps) => {
  const { item, onDelete } = props;
  const [complete, setComplete] = useState<boolean>(false);

  const button = {
    minWidth: '20em',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    border: '2px solid black',
  };

  const completed = {
    ...button,
    textDecoration: 'line-through',
  };

  return (
    <Button
      onClick={() => {
        setComplete(true);
      }}
      className={styles.itemContainer}
      style={complete ? completed : button}
    >
      <Box style={{ justifyContent: 'space-between' }}>{item.value}</Box>
      {complete ? <Close onClick={onDelete} /> : <Check />}
    </Button>
  );
};

interface ListProps {
  list: List;
}

const TodoList = (props: ListProps) => {
  const { list } = props;
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    setTodoList(list.items as TodoItem[]);
  }, [list]);

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <div>
        <Typography variant="h6">{list?.name}</Typography>
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
          {todoList.map((item) => (
            <Grid item>
              <TodoListItem
                key={item.id}
                item={item}
                onDelete={() => {
                  console.dir(item);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Paper>
  );
};

export default TodoList;
