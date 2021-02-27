import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './SimpleListDetails.module.css';
import { List } from '../../types';

interface TodoListPaneProps {
  list: List;
}

function TodoListPane(props: TodoListPaneProps) {
  const { list } = props;
  return (
    <div className={styles.detailButtons}>
      <div className={styles.detailButton}>
        <Link to={`/${list.id}`}>
          <Button variant="contained">Open List</Button>
        </Link>
      </div>
    </div>
  );
}

export default TodoListPane;
