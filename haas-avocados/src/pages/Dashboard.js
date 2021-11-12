import React from "react";
import ProjectQuickAdd from "../components/dashboardcomponents/projectquickadd/projectquickadd";
import ProjectOverview from "../components/projectoverview";
import DashboardRow from "../components/dashboardcomponents/DashboardRow.style";
import ContentContainer from "../components/dashboardcomponents/ContentContainer.style";
import JoinProject from "../components/dashboardcomponents/JoinProject/JoinProject";
import HWSets from "../components/dashboardcomponents/HWSets/HWSets";
import Members from "../components/dashboardcomponents/Members/Members";

const Dashboard = () => {
  const data = [
    {
      col1: "Project1",
      col2: "P1 description",
      col3: "HWSet1",
      col4: "Dataset1",
    },
    {
      col1: "Project2",
      col2: "P2 Description",
      col3: "HWSet2",
      col4: "Dataset2",
    },
    {
      col1: "Project3",
      col2: "P3 Description",
      col3: "HWSet3",
      col4: "Dataset3",
    },
  ];
  return (
    <>
      <DashboardRow>
        <ProjectQuickAdd />
        {/* has its own special container to keep size the same */}
        <ContentContainer width="100%" padding="0" margin="10px">
          <ProjectOverview data={data} />
        </ContentContainer>
      </DashboardRow>
      <DashboardRow>
      {/* this is the left side of the bottom half */}
        <ContentContainer 
          width="80%"
          padding="0px"
          margin="0px 10px 0px 0px"
          flexdirection="column"
        >
          <ContentContainer
            width="100%"
            border
            // padding="5px 10px"
            margin="0px 0px 10px 0px"
          >
            <JoinProject />
          </ContentContainer>
            <HWSets />
        </ContentContainer>

        {/* this is the right side */}
        <ContentContainer
          width="20%"
          border
          padding="0px 0px"
          margin="0px 10px"
        >
          <Members />
        </ContentContainer>
      </DashboardRow>
    </>
  );
};

export default Dashboard;
