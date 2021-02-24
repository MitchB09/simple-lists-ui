import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { List } from '../../types';

interface RouteInfo {
  id: string;
}

const RandomItem = () => {
  const { id } = useParams<RouteInfo>();
  const [list, setList] = useState<List>();
  const [randomItem, setRandomItem] = useState<string>();

  const getRandom = useCallback(() => {
    if (list?.items) {
      setRandomItem(list.items[Math.floor(Math.random() * list.items.length)].value);
    }
  }, [list]);

  useEffect(() => {
    api
      .get<List>(`/lists/${id}`)
      .then((response) => {
        const { data } = response;
        setList(data);
        getRandom();
      })
      // .catch((error) => {
      //   console.log(error);
      // })
      .then(() => {
        // always executed
      });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
