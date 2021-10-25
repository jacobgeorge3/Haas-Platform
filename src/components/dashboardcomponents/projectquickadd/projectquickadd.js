import React from "react";
import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Button } from "../../button.style";
import {
  QuickAddContainer,
  Title,
  TextFieldWrapper,
  FieldDesc,
} from "./projectquickadd.style";

const ProjectQuickAdd = () => {
  return (
    <>
      <QuickAddContainer>
        <Title>Project Quick Add</Title>
        <FieldDesc>Project Name:</FieldDesc>
        <TextFieldWrapper>
          <TextField variant="filled" label="Project Name" />
        </TextFieldWrapper>
        <FieldDesc>Project Description:</FieldDesc>
        <TextFieldWrapper>
          <TextField multiline variant="filled" label="Project Description" rows="6" maxrows="6" />
        </TextFieldWrapper>
        <Button>+ Project</Button>
      </QuickAddContainer>
    </>
  );
}

export default ProjectQuickAdd;
