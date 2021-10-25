/**
 * Dataset.js
 * Contains the page contents for the dataset download page.
 * The user should be able to download datasets directly from physio.net
 */

import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const datasets = [
  {title: "Abdominal and Direct Fetal ECG Database", link: "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip" },
  {title: "AHA Database Sample Excluded Record", link: "https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip"},
  {title: "ANSI/AAMI EC13 Test Waveforms", link: "https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip"},
  {title: "BIDMC Congestive Heart Failure Database", link: "https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip"},
  {title: "Body Sway When Standing and Listening to Music Modified to Reinforce Virtual Reality Environment Motion", link: "https://physionet.org/static/published-projects/body-sway-music-vr/body-sway-when-standing-and-listening-to-music-modified-to-reinforce-virtual-reality-environment-motion-1.0.0.zip"},
  {title: "Brain Hemorrhage Extended (BHX): Bounding box extrapolation from thick to thin slice CT images", link: "https://physionet.org/static/published-projects/bhx-brain-bounding-box/brain-hemorrhage-extended-bhx-bounding-box-extrapolation-from-thick-to-thin-slice-ct-images-1.1.zip"},
  {title: "CAP Sleep Database", link: "https://physionet.org/static/published-projects/capslpdb/cap-sleep-database-1.0.0.zip"},
  {title: "CHARIS database", link: "https://physionet.org/static/published-projects/charisdb/charis-database-1.0.0.zip"},
  {title: "ECG-ID Database", link: "https://physionet.org/static/published-projects/ecgiddb/ecg-id-database-1.0.0.zip"},
  {title: "EEG Motor Movement/Imagery Dataset", link: "https://physionet.org/static/published-projects/eegmmidb/eeg-motor-movementimagery-dataset-1.0.0.zip"}
]

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFECA1",
      dark: "#FFECA1",
      main: "#FFECA1"
    },
    secondary: {
      light: "#FFECA1",
      dark: "#FFECA1",
      main: "#FFECA1",
    },
    text: {
      primary: "#ffffff"
    }
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        cell: {
          backgroundColor: 'gray'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontcolor: "white"
        }
      }
    }
  }
});

// maybe add copy citation button
const columns = [
  { field: "id", headerName: "ID", flex: 0.2 },
  { field: "title", headerName: "Dataset", flex: 1 },
  { field: "pageLink", headerName: "Info", flex: 1 },
  { field: "download", headerName: "Download", flex: .75 }
];

const rows = [
  { id: 1, title: "Abdominal and Direct Fetal ECG Database", pageLink: "https://physionet.org/content/adfecgdb/1.0.0/", download: "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip" },
  { id: 2, title: "AHA Database Sample Excluded Record", pageLink: "https://physionet.org/content/ahadb/1.0.0/", download: "https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip" },
  { id: 3, title: "ANSI/AAMI EC13 Test Waveforms", pageLink: "https://physionet.org/content/aami-ec13/1.0.0/", download: "https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip" },
  { id: 4, title: "BIDMC Congestive Heart Failure Database", pageLink: "https://physionet.org/content/chfdb/1.0.0/", download: "https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip" },
  { id: 5, title: "Body Sway When Standing and Listening to Music Modified to Reinforce Virtual Reality Environment Motion", pageLink: "https://physionet.org/content/body-sway-music-vr/1.0.0/", download: "https://physionet.org/static/published-projects/body-sway-music-vr/body-sway-when-standing-and-listening-to-music-modified-to-reinforce-virtual-reality-environment-motion-1.0.0.zip" },
  { id: 6, title: "Brain Hemorrhage Extended (BHX): Bounding box extrapolation from thick to thin slice CT images", pageLink: "https://physionet.org/content/bhx-brain-bounding-box/1.1/", download: "https://physionet.org/static/published-projects/bhx-brain-bounding-box/brain-hemorrhage-extended-bhx-bounding-box-extrapolation-from-thick-to-thin-slice-ct-images-1.1.zip" },
  { id: 7, title: "CAP Sleep Database", pageLink: "https://physionet.org/content/capslpdb/1.0.0/", download: "https://physionet.org/static/published-projects/capslpdb/cap-sleep-database-1.0.0.zip" },
  { id: 8, title: "CHARIS database", pageLink: "https://physionet.org/content/charisdb/1.0.0/", download: "https://physionet.org/static/published-projects/charisdb/charis-database-1.0.0.zip" },
  { id: 9, title: "ECG-ID Database", pageLink: "https://physionet.org/content/ecgiddb/1.0.0/", download: "https://physionet.org/static/published-projects/ecgiddb/ecg-id-database-1.0.0.zip" },
  { id: 10, title: "EEG Motor Movement/Imagery Dataset", pageLink: "https://physionet.org/content/eegmmidb/1.0.0/", download: "https://physionet.org/static/published-projects/eegmmidb/eeg-motor-movementimagery-dataset-1.0.0.zip" }
];

class Dataset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasets: rows
    };
    this.handleTextField = this.handleTextField.bind(this);
  }

  handleTextField(e) {
    this.setState({datasets: rows.filter((data, index) => data.title.toLowerCase().includes(e.target.value.toLowerCase()))});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <h1>Datasets</h1>
        <div style={{ height: 400, width: '100%'}}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-root": {
                backgroundColor: "yellow"
              }
            }}
            rows={this.state.datasets}
            columns={columns}
            />
        </div>
        <br/>
        {/* {
          this.state.datasets.map((dataset, idx) => {
            return <Button variant="outlined" href={dataset.link}>{dataset.title}</Button>
          })
        } */}
        <Box
          sx={{
            margin: "auto",
            width: '80%',
          }}
          >
          <TextField 
            fullWidth
            label="Search Datasets"
            variants="filled"
            color="secondary"
            focused
            onChange={this.handleTextField}
            />
          <Button
            >Click me</Button>
        </Box>
      </ThemeProvider>
    )
  }
}

export default Dataset;