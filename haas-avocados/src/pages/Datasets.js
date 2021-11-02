/**
 * Dataset.js
 * Contains the page contents for the dataset download page.
 * The user should be able to download datasets directly from physio.net
 */

import { TextField } from "@mui/material";
import DatasetTable from "../components/datasetTable";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

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

const rows = [
  { id: 1, 
    title: "Abdominal and Direct Fetal ECG Database", 
    pageLink: "https://physionet.org/content/adfecgdb/1.0.0/", 
    description: "The research material included in the Abdominal and Direct Fetal Electrocardiogram Database contains multichannel fetal electrocardiogram (FECG) recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation. The recordings were acquired in the Department of Obstetrics at the Medical University of Silesia, by means of the KOMPOREL system for acquisition and analysis of fetal electrocardiogram (ITAM Institute, Zabrze, Poland). Each recording comprises four differential signals acquired from maternal abdomen and the reference direct fetal electrocardiogram registered from the fetal head.", 
    download: "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip" 
  },
  { id: 2, 
    title: "AHA Database Sample Excluded Record", 
    pageLink: "https://physionet.org/content/ahadb/1.0.0/", 
    description: "The American Heart Association (AHA), with funding from the National Heart, Lung, and Blood Institute (NHLBI), sponsored the development of the AHA Database for Evaluation of Ventricular Arrhythmia Detectors during the late 1970s and early 1980s at Washington University (St. Louis). The first portions of the AHA Database were released in 1982, and it was completed in 1985. No revisions or updates were made subsequently, although ECRI has distributed the database in several different formats.",
    download: "https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip" 
  },
  { id: 3, 
    title: "ANSI/AAMI EC13 Test Waveforms", 
    pageLink: "https://physionet.org/content/aami-ec13/1.0.0/", 
    description: "The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. The recordings include both synthetic and real waveforms. For details on these test waveforms and how to use them, please refer to section 5.1.2.1, paragraphs (e) and (g) in the reference below.",
    download: "https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip" 
  },
  { id: 4, 
    title: "BIDMC Congestive Heart Failure Database", 
    pageLink: "https://physionet.org/content/chfdb/1.0.0/", 
    description: "This database includes long-term ECG recordings from 15 subjects (11 men, aged 22 to 71, and 4 women, aged 54 to 63) with severe congestive heart failure (NYHA class 3–4). This group of subjects was part of a larger study group receiving conventional medical therapy prior to receiving the oral inotropic agent, milrinone. Further details about the larger study group are available in the first reference cited above. A number of additional studies have made use of these recordings; see the additional references below.",
    download: "https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip" 
  },
  { id: 5, 
    title: "Body Sway When Standing and Listening to Music Modified to Reinforce Virtual Reality Environment Motion", 
    pageLink: "https://physionet.org/content/body-sway-music-vr/1.0.0/", 
    description: "The increased likelihood of falls as a consequence of aging or disease is generally associated with rising levels of body sway during stance.  The use of virtual reality (VR) for studying the role in vision in regulating body sway is well established, however the extent to which music incorporated into a virtual environment can influence sway is not understood. This dataset was collected as part of a study to explore the hypothesis that music manipulated to match VR motion provided by an Oculus Rift head mounted display can lead to increased levels of body sway. Twenty-eight subjects stood for 60 s on a balance platform that measured anterior posterior (AP) and medial lateral (ML) center of pressure movement (indicators of body sway).  While standing, the subjects experienced combinations of 3 visual conditions (VR translation in the AP direction at 0.1 Hz, no translation, and eyes closed) and 4 music conditions (Mozart’s Jupiter Symphony modified to scale volume at 0.1 Hz and 0.25 Hz, unmodified music, and no music) for a total of 12 trials. Analysis of the data using frequency domain measures may reveal the extent to which music influenced body sway.",
    download: "https://physionet.org/static/published-projects/body-sway-music-vr/body-sway-when-standing-and-listening-to-music-modified-to-reinforce-virtual-reality-environment-motion-1.0.0.zip" 
  },
  { id: 6, 
    title: "Brain Hemorrhage Extended (BHX): Bounding box extrapolation from thick to thin slice CT images", 
    pageLink: "https://physionet.org/content/bhx-brain-bounding-box/1.1/", 
    description: "BHX is a public available dataset with bounding box annotations for 5 types of acute hemorrhage as an extension of the qure.ai CQ500 dataset. This dataset intends to provide data resources to help advance hemorrhage detection towards machine learning localization tasks.",
    download: "https://physionet.org/static/published-projects/bhx-brain-bounding-box/brain-hemorrhage-extended-bhx-bounding-box-extrapolation-from-thick-to-thin-slice-ct-images-1.1.zip" 
  },
  { id: 7, 
    title: "CAP Sleep Database", 
    pageLink: "https://physionet.org/content/capslpdb/1.0.0/", 
    description: "The Cyclic Alternating Pattern (CAP) is a periodic EEG activity occurring during NREM sleep. It is characterized by cyclic sequences of cerebral activation (phase A) followed by periods of deactivation (phase B) which separate two successive phase A periods with an interval <1 min. A phase A period and the following phase B period define a CAP cycle, and at least two CAP cycles are required to form a CAP sequence.",
    download: "https://physionet.org/static/published-projects/capslpdb/cap-sleep-database-1.0.0.zip" 
  },
  { id: 8, 
    title: "CHARIS database", 
    pageLink: "https://physionet.org/content/charisdb/1.0.0/",
    description: "The CHARIS database contains multi-channel recordings of ECG, arterial blood pressure (ABP), and intracranial pressure (ICP) of patients diagnosed with traumatic brain injury (TBI). The data is contributed by members of the CHARIS project which aims to systematize the analysis of relevant physiological signals, and create data-driven algorithms to search for potential predictors of acute clinical events for patients with acute brain injury.", 
    download: "https://physionet.org/static/published-projects/charisdb/charis-database-1.0.0.zip" 
  },
  { id: 9, 
    title: "ECG-ID Database", 
    pageLink: "https://physionet.org/content/ecgiddb/1.0.0/", 
    description: `The database contains 310 ECG recordings, obtained from 90 persons. Each recording contains:
    ECG lead I, recorded for 20 seconds, digitized at 500 Hz with 12-bit resolution over a nominal ±10 mV range;
    10 annotated beats (unaudited R- and T-wave peaks annotations from an automated detector);
    information (in the .hea file for the record) containing age, gender and recording date.
    The records were obtained from volunteers (44 men and 46 women aged from 13 to 75 years who were students, colleagues, and friends of the author). The number of records for each person varies from 2 (collected during one day) to 20 (collected periodically over 6 months).`,
    download: "https://physionet.org/static/published-projects/ecgiddb/ecg-id-database-1.0.0.zip" 
  },
  { id: 10, 
    title: "EEG Motor Movement/Imagery Dataset", 
    pageLink: "https://physionet.org/content/eegmmidb/1.0.0/", 
    description: "This data set consists of over 1500 one- and two-minute EEG recordings, obtained from 109 volunteers, as described below.",
    download: "https://physionet.org/static/published-projects/eegmmidb/eeg-motor-movementimagery-dataset-1.0.0.zip" }
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
        <Box
          sx={{
            margin: "auto",
            width: '80%',
          }}
          >
          <TextField 
            fullWidth
            label="Begin typing to search datasets"
            variants="filled"
            color="secondary"
            focused
            onChange={this.handleTextField}
            />
        </Box>
        <br/>
        <div style={{ height: 775, width: '100%'}}>
          <DatasetTable
            rows={this.state.datasets} />
        </div>
        
      </ThemeProvider>
    )
  }
}

export default Dataset;