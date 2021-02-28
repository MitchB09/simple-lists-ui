import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { RandomPageProps, RandomTimedItem } from '../../../types';
import Timer from '../../Timer/Timer';
import styles from './TimedTodo.module.css';

interface CompletableItemProps {
  item: RandomTimedItem;
  onDelete: () => void;
  onEnd: () => void;
}

const CompletableItem = (props: CompletableItemProps) => {
  const { item, onDelete, onEnd } = props;
  const [complete, setComplete] = useState<boolean>(false);
  const [miss, setMiss] = useState<boolean>(false);

  const button = {
    minWidth: '20em',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    border: '2px solid #042415',
  };

  const completed = {
    ...button,
    backgroundColor: '#14A763',
    cursor: 'default',
  };

  const missed = {
    ...button,
    backgroundColor: '#A91428',
    cursor: 'default',
  };

  const onComplete = () => {
    setComplete(true);
  };

  const totalTime = 5 * 60;

  return (
    <span className={styles.itemContainer}>
      <Button
        onClick={complete ? onDelete : onComplete}
        // eslint-disable-next-line no-nested-ternary
        style={complete ? completed : miss ? missed : button}
      >
        <Box style={{ justifyContent: 'space-between' }}>{item.value}</Box>
        {complete ? <Close /> : <Check />}
      </Button>
      <Timer
        seconds={totalTime}
        paused={complete}
        onComplete={() => {
          onEnd();
          setMiss(true);
        }}
      />
    </span>
  );
};

const TimedTodo = (props: RandomPageProps) => {
  const { list } = props;
  const [randomItem, setRandomItem] = useState<RandomTimedItem[]>([]);

  const getRandom = () => {
    if (list?.items) {
      const item = list?.items[Math.floor(Math.random() * list.items.length)];
      setRandomItem((prevState) => [
        ...prevState,
        { randomId: uuidv1(), miss: false, complete: false, ...item },
      ]);
    }
  };

  const deleteItem = (itemId: string) => {
    setRandomItem((prevState) => prevState.filter((item) => item.randomId !== itemId));
  };

  useEffect(() => {
    if (list?.items) {
      const item = list.items[Math.floor(Math.random() * list.items.length)];
      setRandomItem((prevState) => [
        ...prevState,
        { randomId: uuidv1(), miss: false, complete: false, ...item },
      ]);
    }
  }, [list]);

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <Typography variant="h6">{list?.name}</Typography>
      <Grid container spacing={1} direction="column" justify="center" alignItems="center">
        {randomItem.map((item) => (
          <Grid item key={item.randomId}>
            <CompletableItem
              item={item}
              onDelete={() => {
                deleteItem(item.randomId);
              }}
              onEnd={() => {
                getRandom();
              }}
            />
          </Grid>
        ))}
        <Grid>
          <Button onClick={getRandom}>Get Another</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TimedTodo;
