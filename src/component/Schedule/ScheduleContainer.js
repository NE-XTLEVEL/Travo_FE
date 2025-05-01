import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import Card from '../Card';
import DayContainer from './DayContainer.js';

function PlaceBin() {
  const { setNodeRef } = useDroppable({
    id: 'place-bin',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginBottom: 20,
        border: '1px solid #ddd',
        position: 'absolute',
        display: 'flex',
        bottom: 20,
        right: 20,
      }}
    >
      Trash Bin
    </div>
  );
}

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
  height: '90vh',
  width: 450,
};

export default function ScheduleContainer() {
  /*const initialSchedule = {
    day1: [
      {
        kakao_id: 12156,
        local_id: 1,
        name: '인천공항',
        x: 126.442056,
        y: 37.458848,
        address: '인천광역시 중구 공항로 272',
        url: 'https://naver.com',
        category: '교통',
      },
      {
        kakao_id: 12237,
        local_id: 2,
        name: '호우섬 더현대서울점',
        x: 126.928439,
        y: 37.525907,
        address: '108 여의대로 Yeongdeungpo-gu, 영등포구 서울특별시',
        url: '',
        category: '식당',
      },
      {
        kakao_id: 12345,
        local_id: 3,
        name: '남산 케이블카',
        x: 126.983988,
        y: 37.556615,
        address: '우린,서울특별시 중구 회현동1가 번지 1층 산1-19',
        url: '',
        category: '놀거리',
      },
      {
        kakao_id: 12456,
        local_id: 4,
        name: '신라 호텔',
        x: 127.005262,
        y: 37.556048,
        address:
          '서울신라호텔 팔선,서울특별시 중구 장충동 동호로 249 서울신라호텔 2층',
        url: 'https://booking.com',
        category: '숙소',
      },
    ],
    day2: [
      {
        kakao_id: 12456,
        local_id: 5,
        name: '신라 호텔',
        x: 127.005262,
        y: 37.556048,
        address:
          '서울신라호텔 팔선,서울특별시 중구 장충동 동호로 249 서울신라호텔 2층',
        url: 'https://booking.com',
        category: '숙소',
      },
      {
        kakao_id: 12567,
        local_id: 6,
        name: '소담촌 약수점',
        x: 127.012246,
        y: 37.55487,
        address: '동호로10길,서울특별시 중구',
        url: '',
        category: '식당',
      },
      {
        kakao_id: 12678,
        local_id: 7,
        name: '국립 중앙 박물관',
        x: 126.978668,
        y: 37.524143,
        address: '국립중앙박물관 어린이박물관,서울특별시 용산구 서빙고로 137',
        url: '',
        category: '놀거리',
      },
      {
        kakao_id: 12456,
        local_id: 8,
        name: '신라 호텔',
        x: 127.005262,
        y: 37.556048,
        address:
          '서울신라호텔 팔선,서울특별시 중구 장충동 동호로 249 서울신라호텔 2층',
        url: 'https://booking.com',
        category: '숙소',
      },
    ],
  };*/

  const [schedule, setSchedule] = useState({});

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { DelayConstraint: { delay: 500 } })
  );

  const activeItem = activeId
    ? Object.values(schedule)
        .flat()
        .find((item) => item.local_id === activeId)
    : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/mockData.json');
        const body = await response.json();
        setSchedule(body.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

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
          .map((day, index) => (
            <DayContainer
              key={day}
              id={day}
              day={index + 1}
              data={schedule[day]}
            />
          ))}

        {activeId === null ? null : <PlaceBin />}

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
      schedule[day].some((place) => place.local_id === id)
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

    if (overId === 'place-bin') {
      return;
    }
    const overDay = findDay(overId);

    if (!activeDay || !overDay || activeDay === overDay) {
      return;
    }

    setSchedule((prev) => {
      const activeItems = prev[activeDay];
      const overItems = prev[overDay];

      const activeIndex = activeItems.findIndex(
        (place) => place.local_id === id
      );
      const overIndex = overItems.findIndex(
        (place) => place.local_id === overId
      );

      const isBelowLastItem =
        draggingRect &&
        overIndex === overItems.length - 1 &&
        draggingRect.offsetTop > over.rect.offsetTop + over.rect.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;

      const newIndex =
        overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

      return {
        ...prev,
        [activeDay]: [
          ...prev[activeDay].filter((place) => place.local_id !== id),
        ],
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

    if (overId === 'place-bin') {
      setSchedule((schedule) => {
        const newSchedule = { ...schedule };
        const activeItems = newSchedule[activeDay].filter(
          (place) => place.local_id !== id
        );
        newSchedule[activeDay] = activeItems;
        return newSchedule;
      });
      setActiveId(null);
      return;
    }
    const overDay = findDay(overId);

    if (!activeDay || !overDay) {
      return;
    }

    const activeIndex = schedule[activeDay].findIndex(
      (place) => place.local_id === id
    );
    const overIndex = schedule[overDay].findIndex(
      (place) => place.local_id === overId
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
