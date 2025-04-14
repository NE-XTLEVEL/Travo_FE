import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Card from './Card';

/*export function Card({ id, type, name }) {
  const style = {
    width: 300,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    margin: '10px 0',
    background: 'white',
  };

  return (
    <div id={id} style={style}>
      {type} - {name}
    </div>
  );
}*/

export default function SortableCard({ item }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: item.local_id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 250ms ease',
    cursor: 'all-scroll',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card item={item} />
    </div>
  );
}
