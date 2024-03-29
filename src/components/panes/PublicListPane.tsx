import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styles from './SimpleListDetails.module.css';
import { List } from '../../types';

interface PublicListPaneProps {
  list: List;
}

function PublicListPane(props: PublicListPaneProps) {
  const { list } = props;
  return (
    <div className={styles.detailButtons}>
      <div className={styles.detailButton}>
        <Link to={`/${list.id}/random`}>
          <Button variant="contained">Get Random Item</Button>
        </Link>
      </div>
    </div>
  );
}

export default PublicListPane;
