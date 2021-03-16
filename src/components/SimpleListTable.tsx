import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import SimpleListDetails from './panes/SimpleListDetails';
import { List } from '../types';
import api from '../api';
import CreateListDialog from './CreateListDialog';

interface RowProps {
  list: List;
  expanded: boolean;
  setExpanded: () => void;
}

function Row(props: RowProps) {
  const { list, expanded, setExpanded } = props;

  const onChange = () => {
    setExpanded();
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>
          <Box component="span">{list.name}</Box>
          <Box component="span" fontStyle="oblique" style={{ padding: '0px 1rem' }}>
            {list.description}
          </Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SimpleListDetails list={list} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function SimpleListTable() {
  const [lists, setLists] = useState<List[]>([]);
  const [expanded, setExpanded] = useState<string>('');
  const [createNew, setCreateNew] = useState<boolean>(false);

  useEffect(() => {
    api
      .get<List[]>('/lists')
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.dir(error);
      });
    return () => {};
  }, []);

  const handleChange = (list: string) => {
    setExpanded(list === expanded ? '' : list);
  };

  return (
    <>
      <Paper>
        {lists.map((row) => (
          <Row
            key={row.id}
            list={row}
            expanded={expanded === row.id}
            setExpanded={() => handleChange(row.id)}
          />
        ))}
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: '16px', right: '16px' }}
        onClick={() => setCreateNew(true)}
      >
        <AddIcon />
      </Fab>
      <CreateListDialog open={createNew} onClose={() => setCreateNew(false)} />
    </>
  );
}
