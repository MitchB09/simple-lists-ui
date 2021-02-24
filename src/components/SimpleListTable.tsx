import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SimpleListDetails from './SimpleListDetails';
import { List } from '../types';
import api from '../api';

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
          <Box component="span">{list.listName}</Box>
          <Box component="span" fontStyle="oblique">{list.listDescription}</Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SimpleListDetails list={list} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function SimpleListTable() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lists, setLists] = useState<List[]>([]);
  const [expanded, setExpanded] = useState<string>('');

  useEffect(() => {
    api
      .get<List[]>('/lists')
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
    return () => {};
  }, []);

  const handleChange = (list: string) => {
    setExpanded(list);
  };
  return (
    <Paper>
      {lists.map((row) => (
        <Row
          key={row.listName}
          list={row}
          expanded={expanded === row.listName}
          setExpanded={() => handleChange(row.listName)}
        />
      ))}
    </Paper>
  );
}
