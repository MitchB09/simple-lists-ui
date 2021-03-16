import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './SimpleListDetails.module.css';
import { List } from '../../types';

interface RandomItemPaneProps {
  list: List;
  deleteList: () => void;
}

function RandomItemPane(props: RandomItemPaneProps) {
  const { list, deleteList } = props;
  return (
    <div className={styles.detailButtons}>
      <div className={styles.detailButton}>
        <Link to={`/${list.id}/edit`}>
          <Button variant="contained">Open List</Button>
        </Link>
      </div>
      <div className={styles.detailButton}>
        <Link to={`/${list.id}/random`}>
          <Button variant="contained">Get Random Item</Button>
        </Link>
      </div>
      <div className={styles.detailButton}>
        <Button onClick={deleteList} variant="contained">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default RandomItemPane;
