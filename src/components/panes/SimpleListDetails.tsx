import React from 'react';
import Box from '@material-ui/core/Box';
import styles from './SimpleListDetails.module.css';
import TodoListPane from './TodoListPane';
import { List, ListTypes } from '../../types';
import RandomItemPane from './RandomItemPane';
import PublicListPane from './PublicListPane';

export interface SimpleListDetailsProps {
  list: List;
  publicList?: boolean;
  deleteList?: () => void;
}

function SimpleListDetails(props: SimpleListDetailsProps): JSX.Element {
  const { list, publicList, deleteList } = props;
  if (publicList) {
    return (
      <Box className={styles.detailPane}>
        <PublicListPane list={list} />
      </Box>
    );
  }
  switch (list.type) {
    case ListTypes.TodoList:
      return (
        <Box className={styles.detailPane}>
          <TodoListPane list={list} deleteList={deleteList} />
        </Box>
      );
    case ListTypes.RandomList:
    case ListTypes.TimedRandomList:
      return (
        <Box className={styles.detailPane}>
          <RandomItemPane list={list} deleteList={deleteList} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default SimpleListDetails;
