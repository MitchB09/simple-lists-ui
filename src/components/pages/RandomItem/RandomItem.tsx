import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { ListPageProps } from '../ListPage';

const RandomItem = (props: ListPageProps) => {
  const { list } = props;
  const [randomItem, setRandomItem] = useState<string>();

  const getRandom = () => {
    if (list.items) {
      setRandomItem(list.items[Math.floor(Math.random() * list.items.length)].value);
    }
  };

  useEffect(() => {
    if (list?.items) {
      setRandomItem(list.items[Math.floor(Math.random() * list.items.length)].value);
    }
  }, [list]);

  return (
    <Paper style={{ minHeight: '60vh' }}>
      <div>
        <Typography variant="h6">{list?.name}</Typography>
        <Typography variant="h2" style={{ padding: '3rem 0px' }}>
          {randomItem}
        </Typography>
      </div>
      <Button variant="contained" onClick={getRandom}>
        Get Another
      </Button>
    </Paper>
  );
};

export default RandomItem;
