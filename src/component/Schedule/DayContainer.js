import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableCard from './SortableCard.js';

export default function DayContainer({ id, items }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        {items.map((item) => (
          <SortableCard key={item.id} item={item} />
        ))}
      </div>
    </SortableContext>
  );
}
