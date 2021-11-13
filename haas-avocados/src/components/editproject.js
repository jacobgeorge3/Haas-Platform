/**
 * edit project component
 * a simple form that'll create or edit a project
 * receives data from row click(edit) or an indicator that a row wasn't clicked(add)
 */

import { Link, useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button } from "../components/button.style";
import Auth from "../Auth";

import {
  TextFieldWrapper,
  FieldDesc,
} from "./dashboardcomponents/projectquickadd/projectquickadd.style";
import { integerPropType } from "@mui/utils";
const EditProject = (props) => {
  const [pDesc, setDesc] = useState("");
  const [h1Checkout, setH1Checkout] = useState(0);
  const [h1Checkin, setH1Checkin] = useState(0);
  const [h2Checkout, setH2Checkout] = useState(0);
  const [h2Checkin, setH2Checkin] = useState(0);
  const [datahw1, setDataHW1] = useState({});
  const [datahw2, setDataHW2] = useState({});
  const history = useHistory();
  // useEffect that will grab all hwsets a user is associated with
  useEffect(() => {
    Auth.get("/hw/get", { name: "hwset1" }).then((data) =>
      setDataHW1(data["hwset"])
    );
    Auth.get("/hw/get", { name: "hwset2" }).then((data) =>
      setDataHW2(data["hwset"])
    );
  }, []);


  const hardwareDisplayStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: "5px",
    marginTop: "5px",
  };

  const hardwareInputStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "16px",
  };

  const checkoutH1 = (e) => {
    let amount = Number(h1Checkout);
    const x = {
      name: props.name,
      hwset: "hwset1",
      amount: amount,
    };
    
    console.log(x);

    Auth.post("/hw/checkout", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        history.push({
          pathname: '/projects'
        });       }
      console.log("error");
    });
  };

  const checkoutH2 = (e) => {
    let amount = Number(h2Checkout);
    const x = {
      name: props.name,
      hwset: "hwset2",
      amount: amount,
    };
    
    console.log(props.name);

    Auth.post("/hw/checkout", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        history.push({
          pathname: '/projects'
        });       }
      console.log("error");
    });
  };

  const checkinH1 = (e) => {
    let amount = Number(h1Checkin);
    const x = {
      name: props.name,
      hwset: "hwset1",
      amount: amount,
    };
    
    console.log(x);
    console.log(props.name);

    Auth.post("/hw/checkin", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        history.push({
          pathname: '/projects'
        });      
      }
      console.log("error");
    });
  };

  const checkinH2 = (e) => {
    let amount = Number(h2Checkin);
    const x = {
      name: props.name,
      hwset: "hwset2",
      amount: amount,
    };
    
    console.log(x);
    console.log(props.name);

    Auth.post("/hw/checkin", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        history.push({
          pathname: '/projects'
        });       }
      console.log("error");
    });
  };

  function saveChanges() {
    //Code to change hardware sets will go here
    //It would be awesome if we could also save changes to descriptions
  }

  //Return a box with textfields for name, description, and each hardware set
  //If editing a project have a save button that saves changes
  //If adding a project have a create button that creates a new project
  return (
    <>
      <div style={{ padding: "10px" }}>
          <h1>{props.name}</h1>
          <h3>{props.description}</h3>

        <div style={hardwareDisplayStyle}>
          <FieldDesc>HWSet 1</FieldDesc>
          <FieldDesc>{"Capacity: " + datahw1["capacity"]}</FieldDesc>
          <FieldDesc>{"Available: " + datahw1["available"]}</FieldDesc>
        </div>

        <div style={hardwareInputStyle}>
          <div style={hardwareDisplayStyle}>
            <TextField
              variant="outlined"
              color="primary"
              focused
              multiline
              label="Checkout Resources"
              rows="1"
              maxrows="1"
              onChange={(e) => {
                setH1Checkout(e.target.value);
              }}
              focused
            />
            <Link to='/projects' style={{ textDecoration: 'none' }}>
              <Button onClick={checkoutH1}>Checkout</Button>
            </Link>
          </div>

          <div style={hardwareDisplayStyle}>
            <TextField
              variant="outlined"
              color="primary"
              focused
              multiline
              label="Checkin Resources"
              rows="1"
              maxrows="1"
              onChange={(e) => {
                setH1Checkin(e.target.value);
              }}
              focused
            />
            <Link to='/projects' style={{ textDecoration: 'none' }}>
            <Button onClick={checkinH1}>Checkin</Button>
            </Link>
          </div>
        </div>

        <div style={hardwareDisplayStyle}>
          <FieldDesc>HWSet 2</FieldDesc>
          <FieldDesc>{"Capacity: " + datahw2["capacity"]}</FieldDesc>
          <FieldDesc>{"Available: " + datahw2["available"]}</FieldDesc>
        </div>

        <div style={hardwareInputStyle}>
          <div style={hardwareDisplayStyle}>
            <TextField
              variant="outlined"
              color="primary"
              focused
              multiline
              label="Checkout Resources"
              rows="1"
              maxrows="1"
              onChange={(e) => {
                setH2Checkout(e.target.value);
              }}
              focused
            />
            <Link to='/projects' style={{ textDecoration: 'none' }}>
            <Button onClick={checkoutH2}>Checkout</Button>
            </Link>
          </div>

          <div style={hardwareDisplayStyle}>
            <TextField
              variant="outlined"
              color="primary"
              focused
              multiline
              label="Checkin Resources"
              rows="1"
              maxrows="1"
              onChange={(e) => {
                setH2Checkin(e.target.value);
              }}
              focused
            />
            <Link to='/projects' style={{ textDecoration: 'none' }}>
            <Button onClick={checkinH2}>Checkin</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
