import * as React from "react";
import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import SelectedCreatives from "./selected-creatives";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useCursor, useLoadable, useWatchable } from "@airtable/blocks/ui";
import ErrorIcon from '@mui/icons-material/Error';

export default function CreateCreativeAutomatedRefresh({base, table}) {
  const cursor = useCursor();
  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the list of selected records
  useWatchable(cursor, ["selectedRecordIds"]);
  const [refreshGender, setRefeshGender] = useState(false);
  const [refreshRace, setRefreshRace] = useState(false);
  const [refreshAge, setRefreshAge] = useState(false);

  const runAutomation = async () => {
    try {
      const response = await fetch('', { refreshGender, refreshRace, refreshAge });
    }
    catch (e) {
      // ... тут собі обробляй і виводить помилку якшо шось пішло не так
    }
  }; 

  return (
    <Fragment>
      <SelectedCreatives base={base} table={table}/>
      <List disablePadding>
        <ListItem>
          <ListItemButton onClick={() => setRefeshGender(!refreshGender)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={refreshGender}
                tabIndex={1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={`Refresh Gender`} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setRefreshRace(!refreshRace)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={refreshRace}
                tabIndex={2}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={`Refresh Race`} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setRefeshGender(!setRefreshAge)} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={refreshAge}
                tabIndex={3}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={`Refresh Age`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" href="#outlined-buttons">
          Create refreshed creatives
        </Button>
      </Stack>
      <List disablePadding>
        <ListItem>
          <ListItemButton dense>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText primary={`Refresh Gender`} />
          </ListItemButton>
        </ListItem>
      </List>
    </Fragment>
  );
}
