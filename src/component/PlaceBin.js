import { useDroppable } from '@dnd-kit/core';
import { GoTrash } from 'react-icons/go';
import './PlaceBin.css'; //css 파일과 제대로 연결 안 됨
import classNames from 'classnames';

export default function PlaceBin({ isActive }) {
  const { setNodeRef } = useDroppable({
    id: 'place-bin',
  });

  const classes = classNames('PlaceBin', {
    ActivePlaceBin: isActive,
  });

  const style = {
    width: isActive ? 80 : 60,
    height: isActive ? 80 : 60,
    backgroundColor: '#ffffff',
    borderRadius: 70,
    border: '2px solid #D9D9D9',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    right: 20,
  };

  return (
    <div className={classes} style={style} ref={setNodeRef}>
      <GoTrash size="70%" color="#B0B0B0" />
    </div>
  );
}
