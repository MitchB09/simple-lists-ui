import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import styles from './ListPage.module.css';
// import TodoListPane from './TimedTodo/RandomItem';
import api from '../../api';
import { List, ListTypes } from '../../types';
import TodoList from './TodoList/TodoList';
import TimedTodo from './TimedTodo/TimedTodo';
import ListEditPage from './ListEditPage/ListEditPage';
import { useSnackbar } from '../../snackbar/hooks';

interface RouteInfo {
  id: string;
}

interface RouteProps {
  editMode?: boolean;
  publicList?: boolean;
}

export interface ListPageProps {
  list: List;
  updateList: () => void;
}

function ListPage(props: RouteProps) {
  const { editMode, publicList } = props;
  const { id } = useParams<RouteInfo>();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<List>();
  const [editing, setEditing] = useState<boolean>(!!editMode);
  const snackbar = useSnackbar();

  useEffect(() => {
    api
      .get<List>(publicList ? `public/lists/${id}` : `/lists/${id}`)
      .then((response) => {
        const { data } = response;
        setList(data);
      })
      .catch((err) => {
        snackbar.addError(`Error Retrieving List: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [id, publicList, snackbar]);

  const updateList = (updatedList: List) => {
    if (updatedList.id) {
      setLoading(true);
      api
        .put<List>(`/lists/${id}`, updatedList)
        .then(() => {
          snackbar.addSuccess('Updated List Successfully');
        })
        .catch((err) => {
          snackbar.addError(`Error Updating List: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      api
        .post<List>('/lists', updatedList)
        .then(() => {
          snackbar.addSuccess('Created List Successfully');
        })
        .catch((err) => {
          snackbar.addError(`Error Creating List: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    // eslint-disable-next-line no-console
    console.dir(setEditing);
    return <>loading...</>;
  }
  if (!list) {
    return <>Not Found!</>;
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
    case ListTypes.TodoList:
      return (
        <Box className={styles.detailPane}>
          <TodoList list={list} updateList={updateList} />
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

export default ListPage;
