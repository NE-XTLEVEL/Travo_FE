import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Sidebar.module.css';
import styled from 'styled-components';
import { PiSignOut } from 'react-icons/pi';

const SideBarWrap = styled.div`
  z-index: 5;
  height: 100%;
  width: 25%;
  right: -25%;
  top: 0;
  position: fixed;
  background-color: white;
  transition: right 0.5s ease;
  &.open {
    right: 0;
  }
`;

const Sidebar = ({ children, isOpen, setIsOpen }) => {
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
      <SideBarWrap ref={side} className={isOpen ? 'open' : ''}>
        <div className={styles.content}>{children}</div>
        <button className={styles.logoutButton}>
          <PiSignOut />
          로그아웃
        </button>
      </SideBarWrap>
    </div>
  );
};

export default Sidebar;
