import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { RandomPageProps, RandomTimedItem } from '../../../types';
import Timer from '../../Timer/Timer';
import styles from './TimedTodo.module.css';

interface CompletableItemProps {
  item: RandomTimedItem;
  totalTime: number;
  onDelete: () => void;
}

const CompletableItem = (props: CompletableItemProps) => {
  const { item, totalTime, onDelete } = props;
  const [complete, setComplete] = useState<boolean>(false);
  const [miss, setMiss] = useState<boolean>(false);

  const button = {
    minWidth: '20em',
    justifyContent: 'space-between',
    // backgroundColor: '#333333',
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
      <span style={{ display: 'none' }}>
        <Timer
          seconds={totalTime}
          onComplete={() => {
            setMiss(true);
          }}
        />
      </span>
    </span>
  );
};

const TimedTodo = (props: RandomPageProps) => {
  const { list } = props;
  const [timerMinutes, setTimerMinutes] = useState<number>(5);
  const [started, setStarted] = useState<boolean>(false);
  const [notifications, allowNotifications] = useState<boolean>(
    Notification.permission === 'granted',
  );
  const [randomItem, setRandomItem] = useState<RandomTimedItem[]>([]);

  const sendNotification = (body: string) => {
    if (notifications) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const notification = new Notification(list?.name, {
        body,
        icon: `${process.env.PUBLIC_URL}/logo192.png`,
      });
    }
  };

  const getRandom = () => {
    if (list?.items) {
      const item = list?.items[Math.floor(Math.random() * list.items.length)];
      setRandomItem((prevState) => [
        ...prevState,
        { randomId: uuidv1(), miss: false, complete: false, ...item },
      ]);
      sendNotification(item.value);
    }
  };

  const deleteItem = (itemId: string) => {
    setRandomItem((prevState) => prevState.filter((item) => item.randomId !== itemId));
  };

  useEffect(() => {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-console
      console.log('This browser does not support desktop notification');
    } else if (notifications) {
      Notification.requestPermission();
    }
  }, [notifications]);

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
        {started ? (
          <>
            {randomItem.map((item) => (
              <Grid item key={item.randomId}>
                <CompletableItem
                  item={item}
                  totalTime={timerMinutes * 60}
                  onDelete={() => {
                    deleteItem(item.randomId);
                  }}
                />
              </Grid>
            ))}
            <Grid item>
              <Timer
                seconds={timerMinutes * 60}
                onComplete={() => {
                  getRandom();
                }}
                resetOnComplete
              />
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  getRandom();
                }}
              >
                Get Another
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Button
                onClick={() => {
                  setTimerMinutes(5);
                  setStarted(true);
                }}
              >
                5 Minutes
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setTimerMinutes(30);
                  setStarted(true);
                }}
              >
                30 Minutes
              </Button>
            </Grid>
          </>
        )}
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={notifications}
                onChange={() => allowNotifications(!notifications)}
              />
            }
            label="Push Notifications"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TimedTodo;
