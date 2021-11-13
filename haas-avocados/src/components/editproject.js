/**
 * edit project component
 * a simple form that'll create or edit a project
 * receives data from row click(edit) or an indicator that a row wasn't clicked(add)
 */

import { Link } from "react-router-dom";
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
  const [pName, setName] = useState("");
  const [pDesc, setDesc] = useState("");
  const [h1Checkout, setH1Checkout] = useState(0);
  const [h1Checkin, setH1Checkin] = useState(0);
  const [h2Checkout, setH2Checkout] = useState(0);
  const [h2Checkin, setH2Checkin] = useState(0);
  const [datahw1, setDataHW1] = useState({});
  const [datahw2, setDataHW2] = useState({});
  // useEffect that will grab all hwsets a user is associated with
  useEffect(() => {
    Auth.get("/hw/get", { name: "hwset1" }).then((data) =>
      setDataHW1(data["hwset"])
    );
    Auth.get("/hw/get", { name: "hwset2" }).then((data) =>
      setDataHW2(data["hwset"])
    );
    setName(props.name);
  }, []);

  // useEffect(() => {
  //     Auth.get('/hw/get').then(data => setData(data));
  //     Object.keys(data).forEach(key => arr.push({name: key, value: data[key]}))
  // },[]);

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
    try {
      let amount = Number(h1Checkout);
    } catch {
      return;
    }

    const x = {
      name: pName,
      hwset: "hwset1",
      amount: amount,
    };

    console.log(pName);

    Auth.post("/hw/checkout", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        console.log("success");
      }
      console.log("success again");
    });
  };

  const checkoutH2 = (e) => {
    try {
      h2Checkout = Number(h2Checkout);
    } catch {
      return;
    }

    const x = {
      name: pName,
      hwset: "hwset2",
      amount: h2Checkout,
    };

    Auth.post("/hw/checkout", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        console.log("success");
      }
      console.log("success again");
    });
  };

  const checkinH1 = (e) => {
    try {
      h1Checkin = Number(h1Checkin);
    } catch {
      return;
    }

    const x = {
      name: pName,
      hwset: "hwset1",
      amount: h1Checkin,
    };

    Auth.post("/hw/checkin", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        console.log("success");
      }
      console.log("success again");
    });
  };

  const checkinH2 = (e) => {
    let amount = Number(h2Checkin);

    try {
      let amount = Number(h2Checkin);
    } catch {
      return;
    }

    const x = {
      name: pName,
      hwset: "hwset2",
      amount: amount,
    };

    Auth.post("/hw/checkin", x).then((data) => {
      console.log(JSON.stringify(data));
      if (data["status"] == 200) {
        console.log("success");
      }
      console.log("success again");
    });
  };

  // function makeDict(){
  //     const x =  {
  //         'name':pName,
  //         'description':pDesc,
  //         'state':0,
  //         'hw1':parseInt(h1),
  //         'hw2':parseInt(h2),
  //         'user_list':[]
  //     };

  //     Auth.post("/project/create", x).then(data => console.log(data));
  //     //Function to post a new project given the input from the text fields
  // }

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
        <TextFieldWrapper>
          <TextField
            variant="outlined"
            color="primary"
            focused
            multiline
            label="Project Name"
            rows="1"
            maxrows="6"
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={props.name}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextField
            variant="outlined"
            color="primary"
            focused
            multiline
            label="Project Description"
            rows="6"
            maxrows="6"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            defaultValue={props.description}
          />
        </TextFieldWrapper>

        {props.name == "" ? (
          <Link to="/projects">
            <Button /*onClick={() => {console.log(makeDict())}}*/>
              Create
            </Button>
          </Link>
        ) : (
          <Link to="/projects">
            <Button
              onClick={() => {
                console.log("save Changes");
              }}
            >
              Save
            </Button>
          </Link>
        )}

        {/*capacity and resources are hard coded for now*/}
        <div style={hardwareDisplayStyle}>
          <FieldDesc>HWSet 1</FieldDesc>
          <FieldDesc>{"Capacity: " + datahw1["capacity"]}</FieldDesc>
          <FieldDesc>{"Available: " + datahw1["available"]}</FieldDesc>
        </div>

        <div style={hardwareInputStyle}>
          <div style={hardwareDisplayStyle}>
            {/*checkin and checkout are not correct*/}
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
              defaultValue={props.hw1}
            />
            <Button onClick={checkoutH1}>Checkout</Button>
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
              defaultValue={props.hw1}
            />
            <Button onClick={checkinH1}>Checkin</Button>
          </div>
        </div>

        {/*capacity and resources are hard coded for now*/}
        <div style={hardwareDisplayStyle}>
          <FieldDesc>HWSet 2</FieldDesc>
          <FieldDesc>{"Capacity: " + datahw2["capacity"]}</FieldDesc>
          <FieldDesc>{"Available: " + datahw2["available"]}</FieldDesc>
        </div>

        <div style={hardwareInputStyle}>
          <div style={hardwareDisplayStyle}>
            {/*checkin and checkout are not correct*/}
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
              defaultValue={props.hw1}
            />
            <Button onClick={checkoutH2}>Checkout</Button>
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
              defaultValue={props.hw1}
            />
            <Button onClick={checkinH2}>Checkin</Button>
          </div>
        </div>

        <p>{props.name}</p>

      </div>
    </>
  );
};

export default EditProject;
