import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'KakaoBigSans';
  text-align: center;
  font-size: 1.5rem;
  color: #b0b0b0;
`;
