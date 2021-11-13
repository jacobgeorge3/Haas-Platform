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
import Auth from "../../../Auth";
import { makeRenderer } from "react-table";

const ProjectQuickAdd = (props) => {
  const [quickaddname, setquickaddname] = useState("");
  const [quickadddesc, setquickadddesc] = useState("");

  const addProject = () => {
    const x = {
      name: quickaddname,
      description: quickadddesc,
      hw1: 0,
      hw2: 0,
      user_list: [],
    };

    Auth.post("/project/create", x).then((data) => console.log(data));
    window.location.reload(false);
  };

  return (
    <>
      <QuickAddContainer>
        <Title>Project Quick Add</Title>
        <FieldDesc>Project Name:</FieldDesc>
        <TextFieldWrapper>
          <TextField
            color="primary"
            label="Project Name"
            onChange={(e) => setquickaddname(e.target.value)}
          />
        </TextFieldWrapper>
        <FieldDesc>Project Description:</FieldDesc>
        <TextFieldWrapper>
          <TextField
            color="primary"
            multiline
            label="Project Description"
            rows="6"
            maxrows="6"
            onChange={(e) => setquickadddesc(e.target.value)}
          />
        </TextFieldWrapper>
        <Button onClick={addProject}>+ Project</Button>
      </QuickAddContainer>
    </>
  );
};

export default ProjectQuickAdd;
