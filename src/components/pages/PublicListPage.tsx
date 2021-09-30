import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
import api from '../../api';
import { List, ListTypes } from '../../types';
import TimedTodo from './TimedTodo/TimedTodo';
import RandomItem from './RandomItem/RandomItem';

interface RouteInfo {
  id: string;
}

export interface ListPageProps {
  list: List;
  updateList: () => void;
}

function PublicListPage() {
  const { id } = useParams<RouteInfo>();

  const [list, setList] = useState<List>();

  useEffect(() => {
    api
      .get<List>(`/public/lists/${id}`)
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
    case ListTypes.TimedRandomList:
      return (
        <Box className={styles.detailPane}>
          <TimedTodo list={list} />
        </Box>
      );
    case ListTypes.RandomList:
      return (
        <Box className={styles.detailPane}>
          <RandomItem list={list} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default PublicListPage;
