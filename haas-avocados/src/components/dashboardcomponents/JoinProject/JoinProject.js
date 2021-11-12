import { TextField } from "@mui/material";
import { React, useState } from "react";
import { Button } from "../../button.style";
import ContentContainer from "../ContentContainer.style";
import { Title, TextFieldWrapper } from "./JoinProject.style";
import Auth from "../../../Auth";

const JoinProject = () => {
  const [projectName, setProjectName] = useState("");

  const joinProject = () => {
  
    console.log(projectName);
  Auth.post("/project/join", {'name': projectName}).then(data => console.log(data));
  };
  return (
    <>
      <ContentContainer center width="15%">
        <Title>Join Project</Title>
      </ContentContainer>
      <ContentContainer center width="70%" margin="10px 0px">
        <TextFieldWrapper>
          <TextField
            fullWidth
            onChange={(e) => setProjectName(e.target.value)}
          />
        </TextFieldWrapper>
      </ContentContainer>
      <ContentContainer center width="15%">
        <Button onClick={joinProject}>Join</Button>
      </ContentContainer>
    </>
  );
};

export default JoinProject;
