import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { List } from '../types';
import api from '../api';
import ListRow from './ListRow';

interface DiceRollerState {
  rolls: number[];
  result: number;
  error?: string;
}

function DiceRoller() {
  const [diceText, setDiceText] = useState<string>('1d20');
  const [rollerState, setRolls] = useState<DiceRollerState>({ rolls: [], result: 0 });

  const rollDie = (max: number) => Math.floor(Math.random() * max) + 1;

  const diceRoll = () => {
    const diceRollRegex = /^(\d+)[d](\d+)((?:[+|-]\d+)*)$/;
    const vars = diceText.match(diceRollRegex);
    const newRoll = [];
    let result = 0;
    if (vars && vars.length >= 3) {
      const diceAmt = +vars[1];
      const diceSize = +vars[2];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < diceAmt; i++) {
        const roll = rollDie(diceSize);
        newRoll.push(roll);
      }
      result = newRoll.reduce((a, b) => a + b, 0);

      if (vars[3]) {
        // eslint-disable-next-line no-eval
        result = eval(result + vars[3]);
      }
      setRolls({ rolls: newRoll, result, error: undefined });
    } else {
      setRolls({ rolls: [], result: 0, error: `unable to parse value: ${diceText}` });
    }
  };

  return (
    <Paper>
      <TextField
        value={diceText}
        onChange={(e) => {
          setDiceText(e.target.value);
        }}
        label="new item"
        style={{ minWidth: '20em' }}
      />
      {rollerState.error ? (
        <span>{rollerState.error}</span>
      ) : (
        <span>
          Roll: &nbsp;
          <span>{`[${rollerState.rolls.join(', ')}]`}</span>
          &nbsp;
          <span>{rollerState.result}</span>
        </span>
      )}
      <Button variant="contained" onClick={diceRoll}>
        Roll Again
      </Button>
    </Paper>
  );
}

export default function PublicListTable() {
  const [lists, setLists] = useState<List[]>([]);
  const [expanded, setExpanded] = useState<string>('');

  useEffect(() => {
    api
      .get<List[]>('/public/lists')
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
          <ListRow
            key={row.id}
            list={row}
            expanded={expanded === row.id}
            setExpanded={() => handleChange(row.id)}
          />
        ))}
      </Paper>
      <DiceRoller />
    </>
  );
}
