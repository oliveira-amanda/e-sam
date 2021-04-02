import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    padding: 8px;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    background: #4267B2;
    color: #FFF;

    &::before {
      border-style: solid;
      content: '';
      border-color: #4267B2 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      position: absolute;
    }
  }


  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
