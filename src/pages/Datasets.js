/**
 * Dataset.js
 * Contains the page contents for the dataset download page.
 * The user should be able to download datasets directly from physio.net
 */

import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
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
    secondary: {
      main: "#FFECA1",
      contrastText: "#ffcc00"
    },
    text: {
      primary: "#ffffff"
    }
  }
})

class Dataset extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasets: datasets
    };
    this.handleTextField = this.handleTextField.bind(this);
  }

  handleTextField(e) {
    this.setState({datasets: datasets.filter((data, index) => data.title.toLowerCase().includes(e.target.value.toLowerCase()))});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <h1>Datasets</h1>
        {
          this.state.datasets.map((dataset, idx) => {
            return <Button variant="outlined" href={dataset.link}>{dataset.title}</Button>
          })
        }
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
        </Box>
      </ThemeProvider>
    )
  }
}

export default Dataset;