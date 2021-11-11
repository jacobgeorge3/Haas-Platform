import styled from "styled-components";

export const BiocardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  word-wrap: break-word;
  margin: 10px;
  width: 20%;
  flex: 1;
`;

export const ImgWrapper = styled.div`
  width: 40%;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  width: 100%;
  vertical-align: middle;
  height: 100%;
  margin-bottom: 20px;
`;

export const Name = styled.div`
  color: #ffffff;
  font-size: 20px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 20px;
`;

export const BioWrapper = styled.div`
margin-left: 10px;
margin-right:10px;
padding-left: 20px;
padding-right: 20px;
`;

export const Bio = styled.p`
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 350;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
  word-wrap: break-word;
`;
