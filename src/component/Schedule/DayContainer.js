import react from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Modal from '../Modal.js';
import SortableCard from '../SortableCard.js';
import TransportDuration from '../TransportDuration.js';

const API_KEY = process.env.REACT_APP_ODSAY_API_KEY;
const durationCache = new Map();

export default function DayContainer({ id, day, data }) {
  const items = data;
  const colors = ['#FF4646', '#1CBB39', '#811CBB', 'orange', 'blue'];
  const dayColor = colors[(day - 1) % colors.length];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    async function Duration() {
      const promises = [];

      for (let i = 0; i < items.length - 1; i++) {
        const from = items[i];
        const to = items[i + 1];
        const cacheKey = `${from.kakao_id}-${to.kakao_id}`;

        if (durationCache.has(cacheKey)) {
          promises.push(Promise.resolve(durationCache.get(cacheKey)));
          console.log('Cache hit:', cacheKey, durationCache.get(cacheKey));
          continue;
        }
        try {
          const response = await axios.post(
            'https://apis.openapi.sk.com/transit/routes',
            {
              startX: from.x,
              startY: from.y,
              endX: to.x,
              endY: to.y,
            },
            {
              headers: {
                appKey: API_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 14) {
            promises.push(response.message);
          } else if (response.status === 31) {
            promises.push(response.message);
          }

          const itineraries = response.data?.metaData?.plan?.itineraries;
          let time;
          if (!itineraries || itineraries.length === 0) {
            time = '도보 이동';
          } else {
            time = itineraries[0].totalTime;
            time = Math.ceil(time / 60); // 분 단위로 변환
            // 총 소요 시간 (s)
          }

          durationCache.set(cacheKey, time); // 캐시 저장
          promises.push(time);
        } catch (error) {
          console.error(error);
          promises.push(error.message);
        }
      }
      const results = await Promise.all(promises);
      console.log('results: ', results);
      setDurations(results);
    }

    if (items.length > 1) {
      Duration();
    } else {
      setDurations([]);
    }
  }, [items]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.local_id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="DayHeader">
        <div className="dayNum" style={{ color: dayColor }}>
          {day}일차
        </div>
        <div className="addPlace" onClick={openModal}>
          <span className="addButton">+ </span>장소추가
        </div>
      </div>
      <div ref={setNodeRef}>
        {items.map((item, index) => (
          <react.Fragment key={item.local_id}>
            <SortableCard item={item} />
            {index < items.length - 1 && (
              <TransportDuration duration={durations[index]} />
            )}
          </react.Fragment>
        ))}
      </div>
      <Modal open={isModalOpen} close={closeModal}></Modal>
    </SortableContext>
  );
}
