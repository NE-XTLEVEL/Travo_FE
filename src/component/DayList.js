import React from 'react';
import { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import './DayList.css';
import Modal from './Modal.js';
import AddLocation from './AddLocation.js';
import TransportDuration from './TransportDuration';
import SortableCard from './SortableCard.js';

const API_KEY = process.env.REACT_APP_ODSAY_API_KEY;
const durationCache = new Map();

function DayList({ id, day, data, setData }) {
  const items = data[id];
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
        const cacheKey = `${from.kakao_id}-${to.kakao_id}`;

        if (durationCache.has(cacheKey)) {
          results.push(durationCache.get(cacheKey));
          console.log('Cache hit:', cacheKey, durationCache.get(cacheKey));
          continue;
        }
        const url = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${from.x}&SY=${from.y}&EX=${to.x}&EY=${to.y}&apiKey=${API_KEY}`;

        try {
          const response = await fetch(url);
          if (response.status === 429) {
            results.push(response.message);
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
            // time = data.error.msg;
            time = '?';
          } else if (data.error) {
            // 서버, 형식 오류
            console.error('Error:', data.error);
            time = '?';
          }

          durationCache.set(cacheKey, time); // 캐시 저장
          results.push(time);
        } catch (error) {
          console.error(error);
          results.push(error.message);
        }

        await new Promise((r) => setTimeout(r, 500)); // 딜레이
      }
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
      <div className="DayList">
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
      </div>
      <Modal open={isModalOpen} close={closeModal}>
        <AddLocation dayId={day} data={data} setData={setData} close={closeModal} />
      </Modal>
    </SortableContext>
  );
}

export default DayList;
