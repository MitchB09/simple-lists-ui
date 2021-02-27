import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { ListItem, RandomPageProps, RandomTimedItem } from '../../../types';
import Timer from '../../Timer/Timer';
import styles from './TimedTodo.module.css';

interface CompletableItemProps {
  item: ListItem;
  onDelete: () => void;
}

const CompletableItem = (props: CompletableItemProps) => {
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
    backgroundColor: '#14A763',
    cursor: 'default',
  };

  return (
    <Button
      onClick={
        complete
          ? onDelete : () => { setComplete(true); }
      }
      className={styles.itemContainer}
      style={complete ? completed : button}
    >
      <Box style={{ justifyContent: 'space-between' }}>{item.value}</Box>
      {complete ? <Close /> : <Check />}
    </Button>
  );
};

const TimedTodo = (props: RandomPageProps) => {
  const { list } = props;
  const [randomItem, setRandomItem] = useState<RandomTimedItem[]>([]);

  const getRandom = () => {
    if (list?.items) {
      const item = list?.items[Math.floor(Math.random() * list.items.length)];
      setRandomItem((prevState) => [...prevState, { randomId: uuidv1(), ...item }]);
    }
  };

  const deleteItem = (itemId: string) => {
    setRandomItem((prevState) => prevState.filter((item) => item.randomId !== itemId));
  };

  useEffect(() => {
    if (list?.items) {
      const item = list.items[Math.floor(Math.random() * list.items.length)];
      setRandomItem((prevState) => [...prevState, { randomId: uuidv1(), ...item }]);
    }
  }, [list]);

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Typography variant="h6">{list?.name}</Typography>
      <Grid container spacing={1} direction="column" justify="center" alignItems="center">
        {randomItem.map((item) => (
          <Grid item>
            <CompletableItem
              key={item.randomId}
              item={item}
              onDelete={() => {
                deleteItem(item.randomId);
              }}
            />
          </Grid>
        ))}
        <Grid>
          <Button onClick={getRandom}>Get Another</Button>
          <Timer seconds={5 * 60} onComplete={getRandom} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TimedTodo;
