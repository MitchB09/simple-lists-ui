import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteInfo {
  id: string;
}

const RandomItem = () => {
  const { id } = useParams<RouteInfo>();

  return <div>{+id}</div>;
};

export default RandomItem;
