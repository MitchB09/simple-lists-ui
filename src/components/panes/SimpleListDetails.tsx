import React from 'react';
import Box from '@material-ui/core/Box';
import styles from './SimpleListDetails.module.css';
import TodoListPane from './TodoListPane';
import { List } from '../../types';
import RandomItemPane from './RandomItemPane';

export interface SimpleListDetailsProps {
  list: List;
}

function SimpleListDetails(props: SimpleListDetailsProps) {
  const { list } = props;
  switch (list.type) {
    case 'TodoList':
      return (
        <Box className={styles.detailPane}>
          <TodoListPane list={list} />
        </Box>
      );
    case 'RandomList':
      return (
        <Box className={styles.detailPane}>
          <RandomItemPane list={list} />
        </Box>
      );
    case 'TimedRandomList':
      return (
        <Box className={styles.detailPane}>
          <RandomItemPane list={list} />
        </Box>
      );
    default:
      return <>Whoops</>;
  }
}

export default SimpleListDetails;
