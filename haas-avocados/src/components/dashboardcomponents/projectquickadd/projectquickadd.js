import { React, useState } from "react";
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
  const [quickaddname, setquickaddname] = useState("");
  const [quickadddesc, setquickadddesc] = useState("");
  const addProject = () => {
    console.log("add project");
  };
  return (
    <>
      <QuickAddContainer>
        <Title>Project Quick Add</Title>
        <FieldDesc>Project Name:</FieldDesc>
        <TextFieldWrapper>
          <TextField color="primary" label="Project Name" />
        </TextFieldWrapper>
        <FieldDesc>Project Description:</FieldDesc>
        <TextFieldWrapper>
          <TextField
            color="primary"
            multiline
            label="Project Description"
            rows="6"
            maxrows="6"
          />
        </TextFieldWrapper>
        <Button onClick={addProject}>+ Project</Button>
      </QuickAddContainer>
    </>
  );
};

export default ProjectQuickAdd;
