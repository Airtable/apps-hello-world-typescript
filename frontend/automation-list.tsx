import * as React from "react";
import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from '@mui/material/Typography';
import CreateCreativeAutomatedRefresh from "./automations/create-creative-automated-refresh";
import CreateCreativeAutomatedVersion from "./automations/create-creative-automated-version";

export default function AutomaitionList() {
  return (
    <Fragment>
      <Typography variant="h4">
        Select Automation:
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="create-creative-automated-refresh-content"
          id="create-creative-automated-refresh-header"
        >
          Automatically create creative technical tasks for the refresh creative type
        </AccordionSummary>
        <AccordionDetails>
          <CreateCreativeAutomatedRefresh />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="create-creative-automated-version-content"
          id="create-creative-automated-version-header"
        >
          To automatically create creative technical tasks for the version creative type
        </AccordionSummary>
        <AccordionDetails>
          <CreateCreativeAutomatedVersion />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
