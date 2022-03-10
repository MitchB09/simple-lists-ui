import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './SimpleListDetails.module.css';
import { List } from '../../types';

interface TodoListPaneProps {
  list: List;
  deleteList?: () => void;
}

function TodoListPane(props: TodoListPaneProps) {
  const { list, deleteList } = props;
  return (
    <div className={styles.detailButtons}>
      <div className={styles.detailButton}>
        <Button component={Link} to={`/user/${list.id}`} variant="contained">
          Check List
        </Button>
      </div>
      {deleteList && (
        <div className={styles.detailButton}>
          <Button variant="contained" onClick={deleteList}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default TodoListPane;
