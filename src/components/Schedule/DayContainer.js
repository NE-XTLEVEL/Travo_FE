import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableCard from './SortableCard.js';

const containerStyle = {
  width: 300,
  background: '#dadada',
  padding: 10,
  margin: 10,
  flex: 1,
};

export default function DayContainer({ id, items }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((item) => (
          <SortableCard
            key={item.id}
            id={item.id}
            type={item.type}
            name={item.name}
          />
        ))}
      </div>
    </SortableContext>
  );
}
