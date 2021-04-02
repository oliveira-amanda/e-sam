import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  margin-top: 16px;
  border: 0;
  border-radius: 10px;
  font-weight: 500;
  background: #4267B2;
  color: #FFF;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2,'#4267B2')};
  }
`;
