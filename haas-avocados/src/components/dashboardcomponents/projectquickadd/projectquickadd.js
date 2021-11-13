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
import { Link, useHistory } from "react-router-dom";

const ProjectQuickAdd = (props) => {
  const [quickaddname, setquickaddname] = useState("");
  const [quickadddesc, setquickadddesc] = useState("");
  const history = useHistory();

  const addProject = () => {
    const x = {
      name: quickaddname,
      description: quickadddesc,
      hw1: 0,
      hw2: 0,
      user_list: [],
    };

    Auth.post("/project/create", x).then((data) => {
      if (data['status'] == 200) {
        history.push('/projects');
      } else {
        props.setError(data['msg']);
      }
    });
  };

  return (
    <>
      <QuickAddContainer>
        <Title>Project Add</Title>
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
        <Button onClick={addProject}>
          + Project
        </Button>
      </QuickAddContainer>
    </>
  );
};

export default ProjectQuickAdd;
