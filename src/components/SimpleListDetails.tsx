import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './SimpleListDetails.module.css';

function SimpleListTable() {
  return (
    <Paper className={styles.detailPane}>
      <div className={styles.detailButtons}>
        <Button className={styles.detailButton}>
          <Typography variant="h6">Item 1</Typography>
        </Button>
        <Button className={styles.detailButton}>
          <Typography variant="h6">Item 2</Typography>
        </Button>
        <Button className={styles.detailButton}>
          <Typography variant="h6">Item 3</Typography>
        </Button>
      </div>
    </Paper>
  );
}

export default SimpleListTable;
