import React, { useState, useEffect } from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import css from './Timer.module.css';

// eslint-disable-next-line react/require-default-props
function Timer(props: { seconds: number; onComplete: () => void; resetOnComplete?: boolean }) {
  const { seconds, onComplete, resetOnComplete } = props;
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (seconds && timeLeft === 0) {
      onComplete();
      if (resetOnComplete) {
        setTimeLeft(seconds);
      }
    }

    // exit early when we reach 0
    if (paused || !timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, paused]);

  const displayime = () => `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
    ${String(timeLeft % 60).padStart(2, '0')}`;

  return (
    <>
      <span className={css.timer} style={{ margin: '4px' }}>
        {displayime()}
        <IconButton onClick={() => setTimeLeft(seconds)} style={{ padding: '4px' }}>
          <RestoreIcon />
        </IconButton>
        <IconButton onClick={() => setPaused(!paused)} style={{ padding: '4px' }}>
          {paused ? <PlayArrow /> : <PauseIcon />}
        </IconButton>
      </span>
    </>
  );
}

export default Timer;
