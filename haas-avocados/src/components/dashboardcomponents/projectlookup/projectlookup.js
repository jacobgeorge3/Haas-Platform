import { TextField } from "@mui/material";
import React from "react";
import { Button } from "../../button.style";
import ContentContainer from "../ContentContainer.style";
import { Title, TextFieldWrapper } from "./projectlookup.style";

const projectlookup = () => {
  return (
    <>
        <ContentContainer center width="15%">
          <Title>Project Lookup</Title>
        </ContentContainer>
        <ContentContainer center width="70%">
          <TextFieldWrapper>
            <TextField fullWidth />
          </TextFieldWrapper>
        </ContentContainer>
        <ContentContainer center width="15%">
          <Button>Search</Button>
        </ContentContainer>
    </>
  );
};

export default projectlookup;
