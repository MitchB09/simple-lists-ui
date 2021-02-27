import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
// import TodoListPane from './TimedTodo/RandomItem';
import api from '../../api';
import TodoListPane from '../panes/TodoListPane';
import { List } from '../../types';
import TodoList from './TodoList/TodoList';

interface RouteInfo {
  id: string;
}

export interface ListPageProps {
  list: List;
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
    return (<>loading...</>);
  }
  switch (list.type) {
    case 'TodoList':
      return (
        <Box className={styles.detailPane}>
          <TodoList list={list} />
        </Box>
      );
    case 'TimedRandomList':
      return (
        <Box className={styles.detailPane}>
          <TodoListPane list={list} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default ListPage;
