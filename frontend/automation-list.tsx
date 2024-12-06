import * as React from "react";
import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from '@mui/material/Typography';
import CreateCreativeRefresh from "./automations/create-creative-refresh";
import CreateCreativeVersion from "./automations/create-creative-version";
import CreateCreativeAdaptation from "./automations/create-creative-adaptation";
import CreateCreativeOriginal from "./automations/create-creative-original";

const list = [
  {
    key: 'create-creative-adaptation',
    text: 'Automatically create creative technical tasks for the adaptation creative type',
    component: <CreateCreativeAdaptation />,
  },
  {
    key: 'create-creative-refresh',
    text: 'Automatically create creative technical tasks for the refresh creative type',
    component: <CreateCreativeRefresh />,
  },
  {
    key: 'create-creative-version',
    text: 'Automatically create creative technical tasks for the version creative type',
    component: <CreateCreativeVersion />,
  },
  {
    key: 'create-creative-original',
    text: 'Automatically create creative technical tasks for the original creative type',
    component: <CreateCreativeOriginal />,
  },
];

export default function AutomaitionList() {
  return (
    <Fragment>
      <Typography variant="h4">
        Select Automation:
      </Typography>
      {list.map((automation) => (
        <Accordion key={automation.key}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${automation.key}-content`}
            id={`${automation.key}-header`}
          >
            {automation.text}
          </AccordionSummary>
          <AccordionDetails>
            {automation.component}
          </AccordionDetails>
        </Accordion>
      ))}
    </Fragment>
  );
}
