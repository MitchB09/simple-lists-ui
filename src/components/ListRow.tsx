import React from 'react';
import { Accordion, AccordionSummary, Typography, Box, AccordionDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import SimpleListDetails from './panes/SimpleListDetails';
import { List } from '../types';

interface RowProps {
  list: List;
  expanded: boolean;
  setExpanded: () => void;
  deleteList?: () => void;
}

export default function Row(props: RowProps) {
  const { list, expanded, setExpanded, deleteList } = props;

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
        <SimpleListDetails list={list} deleteList={deleteList} />
      </AccordionDetails>
    </Accordion>
  );
}
