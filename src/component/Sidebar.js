import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Sidebar.module.css';
import { PiSignOut } from 'react-icons/pi';

const Sidebar = ({ children, isOpen, setIsOpen, mobile }) => {
  //mobile일 때 sidebar의 너비를 더 넓게 설정
  const side = useRef();

  const handleClose = useCallback(
    (e) => {
      if (side.current && !side.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  ); // setIsOpen이 변경될 때만 handleClose를 새로 정의함

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousedown', handleClose);
    } else {
      window.removeEventListener('mousedown', handleClose);
    }

    return () => {
      window.removeEventListener('mousedown', handleClose);
    };
  }, [isOpen, handleClose]);

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={isOpen ? 'open' : ''}
        style={{
          zIndex: 5,
          height: '100%',
          width: mobile ? '70%' : '25%',
          right: isOpen ? 0 : mobile ? '-70%' : '-25%',
          top: 0,
          position: 'fixed',
          backgroundColor: 'white',
          transition: 'right 0.5s ease',
        }}
      >
        <div className={styles.content}>{children}</div>
        <button className={styles.logoutButton}>
          <PiSignOut />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
