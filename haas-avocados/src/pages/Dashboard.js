/*
 * Dashboard page component 
  Displays projects, project quick add, and ability to join existing projects
*/
import React, { useState, useEffect, useRef } from "react";
import ProjectQuickAdd from "../components/dashboardcomponents/projectquickadd/projectquickadd";
import DashboardRow from "../components/dashboardcomponents/DashboardRow.style";
import ContentContainer from "../components/dashboardcomponents/ContentContainer.style";
import JoinProject from "../components/dashboardcomponents/JoinProject/JoinProject";
import Auth from "../Auth";
import ProjectTable from "../components/projectTable";
import { Button } from "../components/button.style";
import { Title } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";

const Dashboard = () => {
  const [error, setError] = useState("");
  const projectTableInstance = useRef(null);
  const memberTableInstance = useRef(null);
  const [data, setData] = useState({});
  const [currProjectRow, setCurrProjectRow] = useState({});
  const [update, setUpdate] = useState("");
  const arr = [];


  // useEffect that will grab all projects a user is associated with
  useEffect(() => {
    Auth.get("/project/get-all").then((data) => setData(data));
    Object.keys(data).forEach((key) =>
      arr.push({ name: key, value: data[key] })
    );
  }, []);

  // defining the columns of the projects table
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


  function formatProjectTableData() {
    const tableData = [];
    for (let [key, value] of Object.entries(data)) {
      tableData.push({
        col1: value["name"],
        col2: value["description"],
        col3: value["hwset1"],
        col4: value["hwset2"],
      });
    }
    return tableData;
  }


  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <p style={{color: 'red'}}>{error}</p>
      <DashboardRow>
        <ProjectQuickAdd handler={setUpdate} setError={setError} />
        {/* has its own special container to keep size the same */}
        <ContentContainer
          height="100%"
          width="100%"
          padding="0"
          margin="10px"
          border
        >
          {/* creating the project table */}
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
        <ContentContainer
          width="80%"
          padding="0px"
          margin="0px 10px 0px 0px"
          flexdirection="column"
        >
          <ContentContainer
            width="100%"
            border
            margin="0px 0px 10px 0px"
          >
            <JoinProject setError={setError} />
          </ContentContainer>
        </ContentContainer>

    </div>
  );
};

export default Dashboard;
