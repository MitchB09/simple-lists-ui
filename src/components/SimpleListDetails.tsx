import React from 'react';
import Box from '@material-ui/core/Box';
import styles from './SimpleListDetails.module.css';
import TodoListPane from './TodoListPane';
import { List } from '../types';

interface SimpleListDetailsProps {
  list: List;
}

function SimpleListDetails(props: SimpleListDetailsProps) {
  const { list } = props;
  return (
    <Box className={styles.detailPane}>
      <TodoListPane list={list} />
    </Box>
  );
}

export default SimpleListDetails;
