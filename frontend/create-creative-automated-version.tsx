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
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CreateCreativeAutomatedVersion({base, table}) {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <Fragment>
      <SelectedCreatives base={base} table={table}/>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Simple version" />
          <Tab label="Medium version" />
          <Tab label="Radical version" />
          <Tab label="Format version" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Fragment>
  );
}
