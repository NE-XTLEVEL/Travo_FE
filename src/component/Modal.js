import React from 'react';
import './Modal.css';

const Modal = (props) => {
  const { open, close } = props;

  // 모달 바깥 영역 클릭 시 닫히도록 설정
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal')) {
      close();
    }
  };

  return (
    <div
      className={open ? 'openModal modal' : 'modal'}
      onClick={handleBackgroundClick}
    >
      {open ? (
        <section onClick={(e) => e.stopPropagation()}>
          {' '}
          {/* 모달 내부 클릭 시 이벤트 버블링 방지 */}
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
