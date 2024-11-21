import * as React from "react";
import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import CreateCreativeAutomatedRefresh from "./create-creative-automated-refresh";
import CreateCreativeAutomatedVersion from "./create-creative-automated-version";

export default function AutomaitionList({base, table}) {
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
          <CreateCreativeAutomatedRefresh base={base} table={table}/>
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
          <CreateCreativeAutomatedVersion base={base} table={table}/>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
