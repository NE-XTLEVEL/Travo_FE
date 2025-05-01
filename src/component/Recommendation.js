import { useEffect, useState } from 'react';
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

import Card from './Card';
import DayList from './DayList.js';

function PlaceBin() {
  const { setNodeRef } = useDroppable({
    id: 'place-bin',
  });

  const style = {
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
  };

  return (
    <div ref={setNodeRef} style={style}>
      Trash Bin
    </div>
  );
}

const Recommendation = () => {
  const [data, setData] = useState({});
  /*const [day, setDay] = useState(0);*/

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { DelayConstraint: { delay: 500 } })
  );
  const activeItem = activeId
    ? Object.values(data)
        .flat()
        .find((item) => item.local_id === activeId)
    : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/mockData.json');
        // await fetch(
        //   'https://api-server-860259406241.asia-northeast1.run.app/location/recommendation',
        //   {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Accept: 'application/json',
        //     },
        //     body: JSON.stringify({
        //       description: '산뜻한 여행을 가고 싶어요',
        //       date: '2023-10-01',
        //     }),
        //   }
        // );
        const body1 = await response.json();
        const body2 = body1.data;
        setData(body2);
        /*setDay(Object.keys(body).length);*/
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div
      className="scroll-container"
      style={{
        height: '90vh', // 원하는 높이로 조정
        overflow: 'scroll',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(data)
          .sort()
          .map((day, index) => (
            <DayList
              key={day}
              id={day}
              day={index + 1}
              data={data}
              setData={setData}
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
    if (id in data) {
      return id;
    }
    return Object.keys(data).find((day) =>
      data[day].some((place) => place.local_id === id)
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

    setData((prevData) => {
      const activeItems = prevData[activeDay];
      const overItems = prevData[overDay];

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
        ...prevData,
        [activeDay]: [...activeItems.filter((place) => place.local_id !== id)],
        [overDay]: [
          ...overItems.slice(0, newIndex),
          data[activeDay][activeIndex],
          ...overItems.slice(newIndex, prevData[overDay].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeDay = findDay(id);

    if (overId === 'place-bin') {
      setData((prevData) => {
        const newData = { ...prevData };
        const activeItems = newData[activeDay].filter(
          (place) => place.local_id !== id
        );
        newData[activeDay] = activeItems;
        return newData;
      });
      setActiveId(null);
      return;
    }
    const overDay = findDay(overId);

    if (!activeDay || !overDay) {
      return;
    }

    const activeIndex = data[activeDay].findIndex(
      (place) => place.local_id === id
    );
    const overIndex = data[overDay].findIndex(
      (place) => place.local_id === overId
    );

    if (activeIndex !== overIndex) {
      setData((prevData) => ({
        ...prevData,
        [overDay]: arrayMove(data[overDay], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }
};

export default Recommendation;
