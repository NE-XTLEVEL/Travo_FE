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

import Card from '../Card';
import DayContainer from './DayContainer';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default function ScheduleContainer() {
  const initialSchedule = {
    day1: [
      {
        id: 'place1',
        type: 'transport',
        name: '제주공항',
        isReservationNeeded: true,
        reservationUrl: 'https://naver.com',
      },
      {
        id: 'place2',
        type: 'restaurant',
        name: '식당 마요네즈',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place3',
        type: 'activity',
        name: '자전거 타기',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place4',
        type: 'accommodation',
        name: '그랜드 호텔',
        isReservationNeeded: true,
        reservationUrl: 'https://booking.com',
      },
    ],
    day2: [
      {
        id: 'place5',
        type: 'accommodation',
        name: '그랜드 호텔',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place6',
        type: 'restaurant',
        name: '자매국수',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place7',
        type: 'activity',
        name: '테디베어 박물관',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place8',
        type: 'accommodation',
        name: '그랜드 호텔',
        isReservationNeeded: false,
        reservationUrl: '',
      },
    ],
    day3: [
      {
        id: 'place14',
        type: 'accommodation',
        name: '하얏트 호텔',
        isReservationNeeded: true,
        reservationUrl: 'https://booking.com',
      },
      {
        id: 'place9',
        type: 'cafe',
        name: '에이바우트',
        isReservationNeeded: false,
        reservationUrl: '',
      },
      {
        id: 'place10',
        type: 'transport',
        name: '제주공항',
        isReservationNeeded: true,
        reservationUrl: 'https://naver.com',
      },
    ],
  };

  const [schedule, setSchedule] = useState(initialSchedule);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activeItem = activeId
    ? Object.values(schedule)
        .flat()
        .find((item) => item.id === activeId)
    : null;

  return (
    <div style={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(schedule)
          .sort()
          .map((day) => (
            <DayContainer key={day} id={day} items={schedule[day]} />
          ))}

        <DragOverlay>
          {activeId ? <Card item={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findDay(id) {
    if (id in schedule) {
      return id;
    }
    return Object.keys(schedule).find((day) =>
      schedule[day].some((place) => place.id === id)
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
    const { id: overId } = over;

    const activeDay = findDay(id);
    const overDay = findDay(overId);

    if (!activeDay || !overDay || activeDay === overDay) {
      return;
    }

    setSchedule((prev) => {
      const activeItems = prev[activeDay];
      const overItems = prev[overDay];

      const activeIndex = activeItems.findIndex((place) => place.id === id);
      const overIndex = overItems.findIndex((place) => place.id === overId);

      const isBelowLastItem =
        draggingRect &&
        overIndex === overItems.length - 1 &&
        draggingRect.offsetTop > over.rect.offsetTop + over.rect.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;

      const newIndex =
        overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

      return {
        ...prev,
        [activeDay]: [...prev[activeDay].filter((place) => place.id !== id)],
        [overDay]: [
          ...prev[overDay].slice(0, newIndex),
          schedule[activeDay][activeIndex],
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

    const activeIndex = schedule[activeDay].findIndex(
      (place) => place.id === id
    );
    const overIndex = schedule[overDay].findIndex(
      (place) => place.id === overId
    );

    if (activeIndex !== overIndex) {
      setSchedule((schedule) => ({
        ...schedule,
        [overDay]: arrayMove(schedule[overDay], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }
}
