import { useState } from 'react';
import {
  DndContext,
  useDraggable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Map from '../component/Map';
import Recommendation from '../component/Recommendation';
import Header from '../component/Header';

const MIN_HEIGHT = 50;
const MAX_HEIGHT = 500;
const INITIAL_HEIGHT = 150;

const DraggableSheet = ({ sheetHeight }) => {
  const { listeners, setNodeRef, setActivatorNodeRef } = useDraggable({
    id: 'bottom-sheet',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        height: sheetHeight,
        borderTop: '1px solid #ccc',
        borderRadius: '10px 10px 0 0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        transition: 'height 250ms ease-in',
      }}
    >
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          cursor: 'grab',
        }}
      >
        <div
          style={{
            width: 80,
            height: 6,
            backgroundColor: '#B0B0B0',
            borderRadius: 3,
          }}
        />
      </div>
      <div
        style={{
          height: sheetHeight - 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Recommendation />
      </div>
    </div>
  );
};

const PlanMobile = () => {
  const [sheetHeight, setSheetHeight] = useState(INITIAL_HEIGHT);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { DelayConstraint: { delay: 500 } })
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ height: '10%', boxSizing: 'border-box' }}>
        <Header />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            height: `calc(100% - ${sheetHeight}px)`,
            padding: 20,
          }}
        >
          <Map />
        </div>
        <DndContext
          sensors={sensors}
          onDragMove={(event) => {
            if (event.active.id === 'bottom-sheet') {
              const deltaY = event.delta.y;
              setSheetHeight((prev) => {
                let newHeight = prev - deltaY;
                return Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
              });
            }
          }}
          modifiers={[restrictToVerticalAxis]}
        >
          <DraggableSheet sheetHeight={sheetHeight} />
        </DndContext>
      </div>
    </div>
  );
};

export default PlanMobile;
