import React from 'react'
import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  border: ${(props) => (props.border ? "5px solid #FFECA1" : "0")};
  justify-content: ${(props) => (props.center? "center": "0")};
  align-items: ${(props) => (props.center? "center": "0")};
  max-height: ${(props) => props.maxheight};
  max-width: ${(props) => props.maxwidth};
  flex-direction: ${(props) => props.flexdirection};
`;


export default ContentContainer
