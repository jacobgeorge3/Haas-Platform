import React, { useState, useEffect, useRef } from "react";
import ProjectQuickAdd from "../components/dashboardcomponents/projectquickadd/projectquickadd";
import ProjectOverview from "../components/projectoverview";
import DashboardRow from "../components/dashboardcomponents/DashboardRow.style";
import ContentContainer from "../components/dashboardcomponents/ContentContainer.style";
import JoinProject from "../components/dashboardcomponents/JoinProject/JoinProject";
import HWSets from "../components/dashboardcomponents/HWSets/HWSets";
import Members from "../components/dashboardcomponents/Members/Members";
import Auth from "../Auth";
import ProjectTable from "../components/projectTable";
import { Button } from "../components/button.style";
import { Title } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";

const Dashboard = () => {
  const projectTableInstance = useRef(null);
  const memberTableInstance = useRef(null);
  const [data, setData] = useState({});
  const [currProjectRow, setCurrProjectRow] = useState({});
  const arr = [];

  useEffect(() => {
    Auth.get("/project/get-all").then((data) => setData(data));
    Object.keys(data).forEach((key) =>
      arr.push({ name: key, value: data[key] })
    );
  }, []);

  const projectsColumns = React.useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "col1", // accessor is the "key" in the data
        filter: "pSearch",
      },
      {
        Header: "Project Description",
        accessor: "col2",
      },
      {
        Header: "Hardware Set 1",
        accessor: "col3",
      },
      {
        Header: "Hardware Set 2",
        accessor: "col4",
      },
    ],
    []
  );

  const memberColumns = React.useMemo(
    () => [
      {
        Header: "Project Members",
        accessor: "col1", // accessor is the "key" in the data
        filter: "pSearch",
      },
    ],
    []
  );

  function formatProjectTableData() {
    const tableData = [];
    for (let [key, value] of Object.entries(data)) {
      tableData.push({
        col1: value["name"],
        col2: value["description"],
        col3: value["hw1"],
        col4: value["hw2"],
      });
    }
    return tableData;
  }

  function formatMemberSetTableData() {
    const tableData = [];
    let vals = Object.entries(data);
    console.log(vals);
    // TODO: find a way to isolate the currProjectRow's user_list in order to push onto tableData
    // all users that are associated with the project
    console.log(vals.user_list);

    return tableData;
  }

  return (
    <>
      <DashboardRow>
        <ProjectQuickAdd />
        {/* has its own special container to keep size the same */}
        <ContentContainer
          height="100%"
          width="100%"
          padding="0"
          margin="10px"
          border
        >
          <ProjectTable
            columns={projectsColumns}
            data={formatProjectTableData()}
            ref={projectTableInstance}
            onRowClick={(row) => {
              setCurrProjectRow(row.original);
            }}
          />
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
          flexdirection="column"
        >
          <ProjectTable
            columns={memberColumns}
            data={formatMemberSetTableData()}
            ref={memberTableInstance}
            onRowClick={() => console.log("member table row click")}
          />
        </ContentContainer>
      </DashboardRow>
      <Button
        onClick={() => {
          console.log(currProjectRow);
        }}
      >
        Test Data
      </Button>
    </>
  );
};

export default Dashboard;
