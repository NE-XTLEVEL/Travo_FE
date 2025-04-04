import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortablePlace from './Place.js';

const containerStyle = {
  width: 100,
  background: '#dadada',
  padding: 10,
  margin: 10,
  flex: 1,
};

export default function DayPlan({ id, places }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={places.map((place) => place.id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {places.map((place) => (
          <SortablePlace
            key={place.id}
            id={place.id}
            category={place.category}
            name={place.name}
          />
        ))}
      </div>
    </SortableContext>
  );
}
