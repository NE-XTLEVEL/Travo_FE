import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Place } from './Place';
import DayPlan from './DayPlan';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up ${id}.`);
  },

  onDragOver(id, overId) {
    if (overId) {
      console.log(`${id} was moved over droppable area ${overId}.`);
      return;
    }
    console.log(`${id} is no longer over a droppable area.`);
  },

  onDragEnd(id, overId) {
    if (overId) {
      console.log(`${id} was dropped over droppable area ${overId}`);
      return;
    }
    console.log(`${id} was dropped.`);
  },

  onDragCancel(id) {
    console.log(`Dragging was cancelled. ${id} was dropped.`);
  },
};

export default function TravelPlan() {
  const initialPlans = {
    day1: [
      { id: 'id1', category: 'A', name: 'place 1' },
      { id: 'id2', category: 'B', name: 'place 2' },
    ],
    day2: [
      { id: 'id3', category: 'C', name: 'place 3' },
      { id: 'id4', category: 'D', name: 'place 4' },
    ],
    day3: [
      { id: 'id5', category: 'E', name: 'place 5' },
      { id: 'id6', category: 'F', name: 'place 6' },
    ],
  };

  const [plans, setPlans] = useState(initialPlans);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activePlace = activeId
    ? Object.values(plans)
        .flat()
        .find((place) => place.id === activeId)
    : null;

  return (
    <div style={wrapperStyle}>
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <DayPlan id="day1" places={plans.day1} />
        <DayPlan id="day2" places={plans.day2} />
        <DayPlan id="day3" places={plans.day3} />
        <DragOverlay>
          {activePlace ? (
            <Place
              id={activePlace.id}
              category={activePlace.category}
              name={activePlace.name}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findDay(id) {
    if (id in plans) {
      return id;
    }
    return Object.keys(plans).find((key) =>
      plans[key].some((place) => place.id === id)
    );
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;

    if (!over) return;

    const { id: overId } = over;

    const activeDay = findDay(id);
    const overDay = findDay(overId);

    if (!activeDay || !overDay || activeDay === overDay) {
      return;
    }

    setPlans((prev) => {
      const activePlans = prev[activeDay];
      const overPlans = prev[overDay];

      const activeIndex = activePlans.findIndex((place) => place.id === id);
      const overIndex = overPlans.findIndex((place) => place.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overPlans.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          over.rect &&
          draggingRect &&
          overIndex === overPlans.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overPlans.length + 1;
      }

      return {
        ...prev,
        [activeDay]: [...prev[activeDay].filter((place) => place.id !== id)],
        [overDay]: [
          ...prev[overDay].slice(0, newIndex),
          plans[activeDay][activeIndex],
          ...prev[overDay].slice(newIndex, prev[overDay].length),
        ],
      };
    });
  }

  function handleDragEnd(evnt) {
    const { active, over } = evnt;
    const { id } = active;
    const { id: overId } = over;

    const activeDay = findDay(id);
    const overDay = findDay(overId);

    if (!activeDay || !overDay) {
      return;
    }

    const activeIndex = plans[activeDay].findIndex((place) => place.id === id);
    const overIndex = plans[overDay].findIndex((place) => place.id === overId);

    if (activeIndex !== overIndex) {
      setPlans((plans) => ({
        ...plans,
        [overDay]: arrayMove(plans[overDay], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }
}
