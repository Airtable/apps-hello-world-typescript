import * as React from "react";
import { Fragment } from "react";

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

function AutomationStatusListItem({view, automation}: {view: View, automation: Automation}) {
  const record = useRecordById(view, automation.id);
  return (
    <ListItem>
      <ListItemButton dense>
        <ListItemIcon>
          {automation.status === 'error' && <ErrorIcon />}
          {automation.status === 'done' && <DoneIcon />}
          {automation.status === 'in progress' && <CircularProgress />}
        </ListItemIcon>
        {(automation.status === 'done' || automation.status === 'in progress') && <ListItemText primary={record.name || automation.id} />}
        {automation.status === 'error' && <ListItemText primary={automation.message} />}
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
