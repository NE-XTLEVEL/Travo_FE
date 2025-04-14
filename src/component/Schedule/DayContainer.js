import react from 'react';
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
      const results = [];

      for (let i = 0; i < items.length - 1; i++) {
        const from = items[i];
        const to = items[i + 1];
        const cacheKey = `${from.local_id}-${to.local_id}`;

        if (durationCache.has(cacheKey)) {
          results.push(durationCache.get(cacheKey));
          continue;
        }
        const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${from.x}&SY=${from.y}&EX=${to.x}&EY=${to.y}&apiKey=${API_KEY}`;

        try {
          const response = await fetch(url);
          if (response.status === 429) {
            results.push('?');
          }

          const data = await response.json();
          let time;
          if (data.result?.path?.[0]?.info?.totalTime) {
            time = data.result.path[0].info.totalTime;
          } else if (data.error?.code === '-98') {
            // 700m 이내인 경우..
            time = '도보 이동';
          } else if (
            data.error &&
            ['3', '4', '5', '6', '-99'].includes(data.error.code)
          ) {
            // 3: 출발 정류장이 존재하지 않음
            // 4: 도착 정류장이 존재하지 않음
            // 5: 출발과 도착 정류장이 존재하지 않음
            // 6: 서비스 지역이 아님
            // -99: 검색결과가 없음
            time = '?';
          } else if (data.error) {
            // 서버, 형식 오류
            console.error('Error:', data.error.msg);
            time = '?';
          }

          durationCache.set(cacheKey, time); // 캐시 저장
          results.push(time);
        } catch (error) {
          console.error(error);
          results.push('?');
        }

        await new Promise((r) => setTimeout(r, 1000)); // 딜레이
      }
      console.log('results', results);
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
