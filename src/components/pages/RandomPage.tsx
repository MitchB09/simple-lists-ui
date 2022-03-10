import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
// import TodoListPane from './TimedTodo/RandomItem';
import api from '../../api';
import { List, ListTypes } from '../../types';
import RandomItem from './RandomItem/RandomItem';
import TimedTodo from './TimedTodo/TimedTodo';
import { useSnackbar } from '../../snackbar/hooks';

interface RouteInfo {
  id: string;
}

interface RandomPageProps  {
  publicList?: boolean;
}

function RandomPage(props: RandomPageProps) {
  const { publicList } = props;
  const { id } = useParams<RouteInfo>();
  const snackbar = useSnackbar();
  const [list, setList] = useState<List>();

  useEffect(() => {
    api
      .get<List>(publicList ? `public/lists/${id}` : `/lists/${id}`)
      .then((response) => {
        const { data } = response;
        setList(data);
      })
      .catch((err) => {
        snackbar.addError(`Error Retrieving List: ${err.message}`);
      });
    return () => {};
  }, [publicList, id, snackbar]);
  if (!list) {
    return <>loading...</>;
  }
  switch (list.type) {
    case ListTypes.RandomList:
      return (
        <Box className={styles.detailPane}>
          <RandomItem list={list} />
        </Box>
      );
    case ListTypes.TimedRandomList:
      return (
        <Box className={styles.detailPane}>
          <TimedTodo list={list} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default RandomPage;
