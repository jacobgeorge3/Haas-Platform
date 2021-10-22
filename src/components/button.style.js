import styled from 'styled-components';

import React from 'react'

export const Button = styled.button`
  border-radius: 4px;
  background: ${(props) => props.backgroundColor};
  white-space: nowrap;
  padding: ${(props) => (props.big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${(props) => (props.fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background: ${(props) => props.hoverColor};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }

`;

Button.defaultProps = {
  backgroundColor: "#2eb62c",
  hoverColor: "#abe098"
};