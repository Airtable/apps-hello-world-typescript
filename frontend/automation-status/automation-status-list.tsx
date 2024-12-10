import * as React from "react";
import { Fragment, ReactNode } from "react";

import { useRecordById } from "@airtable/blocks/ui";
import View from "@airtable/blocks/dist/types/src/models/view";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import List from "@mui/material/List";

import { Automation } from "./types";
import { AUTOMATION_STATUS } from "./automation-status.enum";

const icons: Record<AUTOMATION_STATUS, ReactNode> = {
  [AUTOMATION_STATUS.ERROR]: <ErrorIcon />,
  [AUTOMATION_STATUS.IN_PROGGRESS]: <CircularProgress />,
  [AUTOMATION_STATUS.DONE]: <DoneIcon />,
};

function AutomationStatusListItem({view, automation}: {view: View, automation: Automation}) {
  const record = useRecordById(view, automation.id);
  return (
    <ListItem>
      <ListItemButton dense>
        <ListItemIcon>{icons[automation.status]}</ListItemIcon>
        {[AUTOMATION_STATUS.DONE, AUTOMATION_STATUS.IN_PROGGRESS].includes(automation.status) && <ListItemText primary={record.name || automation.id} />}
        {AUTOMATION_STATUS.ERROR === automation.status && <ListItemText primary={automation.message} />}
      </ListItemButton>
    </ListItem>
  );
}

export default function AutomationStatusList({view, automationsStats}: {view: View, automationsStats: Automation[]}) {
  return (     
    <Fragment>
      <List disablePadding>
        {automationsStats.map((automation) => <AutomationStatusListItem key={automation.id} view={view} automation={automation}/>)}
      </List>
    </Fragment>
  );
}
