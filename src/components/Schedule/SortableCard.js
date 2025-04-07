import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Card({ id, type, name }) {
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
}

export default function SortableCard({ id, type, name }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 250ms ease',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card id={id} type={type} name={name} />
    </div>
  );
}
