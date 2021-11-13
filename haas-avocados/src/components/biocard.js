import React from "react";
import { BiocardContainer, ImgWrapper, Img, Name, BioWrapper, Bio } from "./biocard.style";


// picture and bio card for the landing page
const biocard = (props) => {
  const bio = props.bio;
  const name = props.name;
  return (
    <>
      <BiocardContainer>
        <ImgWrapper>
          <Img src={props.img} />
        </ImgWrapper>
        <Name>{name}</Name>
        <BioWrapper>
          <Bio>{bio}</Bio>
        </BioWrapper>
      </BiocardContainer>
    </>
  );
};

export default biocard;
