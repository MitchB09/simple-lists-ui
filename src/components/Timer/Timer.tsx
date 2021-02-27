import React, { useState, useEffect } from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import css from './Timer.module.css';

interface TimerProps {
  seconds: number;
  onComplete: () => void;
}

function Timer(props: TimerProps) {
  const { seconds, onComplete } = props;
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <Box m={1} className={css.timer}>
      <div style={{ padding: '4px' }}>
        {String(Math.floor(timeLeft / 60)).padStart(2, '0')}
        :
        {String(timeLeft % 60).padStart(2, '0')}
      </div>
      <IconButton onClick={() => setTimeLeft(seconds)} style={{ padding: '4px' }}>
        <RestoreIcon />
      </IconButton>
    </Box>
  );
}

export default Timer;
