import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
// import TodoListPane from './TimedTodo/RandomItem';
import api from '../../api';
import { List } from '../../types';
import RandomItem from './RandomItem/RandomItem';
import TimedTodo from './TimedTodo/TimedTodo';

interface RouteInfo {
  id: string;
}

function ListPage() {
  const { id } = useParams<RouteInfo>();
  const [list, setList] = useState<List>();

  useEffect(() => {
    api
      .get<List>(`/lists/${id}`)
      .then((response) => {
        const { data } = response;
        setList(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.dir(error);
        // TODO snackbar
      });
    return () => {};
  }, [id]);
  if (!list) {
    return <>loading...</>;
  }
  switch (list.type) {
    case 'RandomList':
      return (
        <Box className={styles.detailPane}>
          <RandomItem list={list} />
        </Box>
      );
    case 'TimedRandomList':
      return (
        <Box className={styles.detailPane}>
          <TimedTodo list={list} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default ListPage;
