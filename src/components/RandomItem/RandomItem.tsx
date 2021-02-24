import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { List } from '../../types';

interface RouteInfo {
  id: string;
}

const RandomItem = () => {
  const { id } = useParams<RouteInfo>();
  const [list, setList] = useState<List>();

  useEffect(() => {
    api
      .get<List>(`/lists/${id}`)
      .then(response => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
    return () => {};
  }, [id]);

  

  return (
    <div>{JSON.stringify(list)}</div>
  );
};

export default RandomItem;
