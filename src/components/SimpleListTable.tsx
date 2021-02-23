import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SimpleListDetails from './SimpleListDetails';
import { List } from '../types';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



interface RowProps {
  list: List;
  expanded: boolean;
  setExpanded: () => void;
}

function Row(props: RowProps) {
  const { list, expanded, setExpanded } = props;

  const classes = useRowStyles();

  const onChange = () => {
    setExpanded();
  };

  return (
    <Accordion className={classes.root} expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>{list.listName}</Typography>
        <Typography>{list.listDescription}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SimpleListDetails list={list} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function SimpleListTable() {


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lists, setLists] = React.useState<List[]>([
    {
      listDescription: 'Test New',
      listName: 'New list',
      type: 'RandomList',
    },
    {
      listDescription: 'Example Todo List',
      listName: 'Todo List Test',
      items: [
        {
          value: 'Item 1',
          id: 'bda923a0-48ae-11eb-a274-db424178d82c',
        },
        {
          value: 'Item 2',
          id: 'c04b6cd0-48ae-11eb-a274-db424178d82c',
        },
        {
          value: 'Item 4',
          id: 'c35689f0-48ae-11eb-a274-db424178d82c',
        },
      ],
      type: 'TodoList',
    },
  ]);
  const [expanded, setExpanded] = React.useState<string>('');

  const handleChange = (list: string) => {
    setExpanded(list);
  };
  return (
    <Paper>
      {lists.map((row) => (
        <Row key={row.listName} list={row} expanded={expanded === row.listName} setExpanded={() => handleChange(row.listName)} />
      ))}
    </Paper>
  );
}
