import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { List, TodoItem } from '../../../types';
import styles from './TodoList.module.css';

interface TodoItemProps {
  item: TodoItem;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoListItem = (props: TodoItemProps) => {
  const { item, onComplete, onDelete } = props;

  const button = {
    minWidth: '20em',
  };

  console.dir(onDelete);

  const completed = {
    ...button,
    textDecoration: 'line-through',
  };

  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            checked={item.complete}
            onClick={onComplete}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        )}
        label="Primary"
        className={styles.itemContainer}
        style={item.complete ? completed : button}
      />
    </>
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

  const onComplete = (item: TodoItem) => {
    console.dir('onComplete', item);
  };

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper color="primary" style={{ minWidth: '50vw', backgroundColor: '#303030', marginTop: '1em' }}>
          <Typography variant="h6">{list?.name}</Typography>

          {todoList.map((item) => (
            <Grid item>
              <TodoListItem
                key={item.id}
                item={item}
                onComplete={() => {
                  onComplete(item);
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
