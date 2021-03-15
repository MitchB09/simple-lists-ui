import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
// import TodoListPane from './TimedTodo/RandomItem';
import api from '../../api';
import { List } from '../../types';
import TodoList from './TodoList/TodoList';
import TimedTodo from './TimedTodo/TimedTodo';
import ListEditPage from './ListEditPage/ListEditPage';

interface RouteInfo {
  id: string;
}

export interface ListPageProps {
  list: List;
  updateList: () => void;
}

function ListPage(editMode?: boolean) {
  const { id } = useParams<RouteInfo>();
  const [list, setList] = useState<List>();
  const [editing, setEditing] = useState<boolean>(!!editMode);

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

  const updateList = (updatedList: List) => {
    api
      .put<List>(`/lists/${id}`, updatedList)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.dir(response);
        // TODO snackbar
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.dir(error);
        // TODO snackbar
      });
  };

  if (!list) {
    console.dir(setEditing);
    return <>loading...</>;
  }
  if (editing) {
    return (
      <Box className={styles.detailPane}>
        <ListEditPage
          list={list}
          setList={(updatedList: List) => setList(updatedList)}
          updateList={updateList}
        />
      </Box>
    );
  }
  switch (list.type) {
    case 'TodoList':
      return (
        <Box className={styles.detailPane}>
          <TodoList list={list} updateList={updateList} />
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
