import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  border: 2px solid #D9C8D0;
  border-radius: 10px;
  background: #FFF;

  & + div {
    margin-top: 8px;
  }

  ${props => props.isErrored && css `
    border-color: #C53030;
  `}

  ${props => props.isFocused && css `
    color: #4267B2;
    border-color: #4267B2;
  `}

  ${props => props.isFilled && css `
    color: #4267B2;
    border-color: #4267B2;
  `}

  input {
    flex: 1;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #C53030;
    color: #FFF;

    &::before {
      border-color: #C53030 transparent;
    }
  }
`;
