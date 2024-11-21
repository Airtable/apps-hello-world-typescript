import * as React from "react";
import { Fragment, useState } from "react";

import { useCursor, useLoadable, useRecords, useWatchable } from "@airtable/blocks/ui";

import Button from "@mui/material/Button";
import SelectedCreatives from "./selected-creatives";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid2";

import { SERVER_URL } from "./constants";

type Block = {
  name: string,
  attribute: string,
  category: string,
  parameter: string,
}

export default function CreateCreativeAutomatedRefresh({base, table}) {
  const cursor = useCursor();
  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the list of selected records
  useWatchable(cursor, ["selectedRecordIds"]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [assignee, setAssignee] = useState('');

  const assigneeField = base.tables.find((t) => t.name === 'Creative process').fields.find((f) => f.name === 'Assignee');

  const blockTable = base.tables.find((t) => t.name === 'Blocks');
  const attributeField = blockTable.fields.find((f) => f.name === 'Attribute');
  const categoryField = blockTable.fields.find((f) => f.name === 'Category');
  const blockRecords: any[] = useRecords(blockTable);

  const runAutomation = async () => {
    const newSuccess = [];
    const newErrors = [];
    setSuccess(newSuccess)
    setErrors(newErrors)
    for (const creativeId of cursor.selectedRecordIds) {
      try {
        const response = await fetch(`${SERVER_URL}/creative/create-automated-refresh`, {
          method: 'POST',
          body: JSON.stringify({ id: creativeId, assignee, blocks }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data);
        newSuccess.push(data);
      }
      catch (e) {
        newErrors.push(e);
      }
    }
    setSuccess(newSuccess)
    setErrors(newErrors)
  };

  const removeBlock = (index: number) => {
    blocks.splice(index, 1);
    setBlocks([...blocks]);
  }

  const updateBlock = (index: number, value: string) => {
    blocks[index] = {name: value, attribute: '', category: '', parameter: ''};
    setBlocks([...blocks]);
  }

  const updateAttribute = (index: number, value: string) => {
    blocks[index] = {...blocks[index], attribute: value, category: '', parameter: ''};
    setBlocks([...blocks]);
  }

  const updateCategory = (index: number, value: string) => {
    blocks[index] = {...blocks[index], category: value, parameter: ''};
    setBlocks([...blocks]);
  }

  const updateParameter = (index: number, value: string) => {
    blocks[index] = {...blocks[index], parameter: value};
    setBlocks([...blocks]);
  }

  return (
    <Fragment>
      <SelectedCreatives base={base} table={table}/>
      <Grid container spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="assignee-label">Assignee</InputLabel>
          <Select
            labelId="assignee-label"
            id="assignee"
            value={assignee}
            label="Assignee"
            onChange={(e) => setAssignee(e.target.value)}
          >
            {assigneeField.config.options.choices.map((choice) => (
              <MenuItem key={choice.id} value={choice.name}>{choice.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <FormGroup>
        {blockRecords && blocks.map((block, blockIndex) => (
          <Grid key={`${block.name}-${block.attribute}-${block.category}-${block.parameter}`} container spacing={2}>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>Attribute</InputLabel>
                <Select
                  labelId={`block-${blockIndex}-attribute-label`}
                  id={`block-${blockIndex}-attribute`}
                  value={block.attribute}
                  label="Attribute"
                  onChange={(e) => updateAttribute(blockIndex, e.target.value)}
                >
                  {attributeField.config.options.choices
                    .filter(
                      (choice) => blockRecords
                        .filter((record) => record.getCellValue('Block').name === block.name)
                        .map((record) => record.getCellValue('Attribute').name)
                        .includes(choice.name)
                    )
                    .map((choice) => (
                    <MenuItem key={choice.id} value={choice.name}>{choice.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>Category</InputLabel>
                <Select
                  labelId={`block-${blockIndex}-category-label`}
                  id={`block-${blockIndex}-category`}
                  value={block.category}
                  label="Category"
                  onChange={(e) => updateCategory(blockIndex, e.target.value)}
                >
                  {categoryField.config.options.choices
                    .filter(
                      (choice) => blockRecords
                        .filter((record) => record.getCellValue('Block').name === block.name && record.getCellValue('Attribute').name === block.attribute)
                        .map((record) => record.getCellValue('Category').name)
                        .includes(choice.name)
                    )
                    .map((choice) => (
                    <MenuItem key={choice.id} value={choice.name}>{choice.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth>
                <InputLabel id={`block-${blockIndex}-label`}>Parameter</InputLabel>
                <Select
                  labelId={`block-${blockIndex}-parameter-label`}
                  id={`block-${blockIndex}-parameter`}
                  value={block.parameter}
                  label="Parameter"
                  onChange={(e) => updateParameter(blockIndex, e.target.value)}
                >
                  {blockRecords
                    .filter((record) => record.getCellValue('Block').name === block.name && record.getCellValue('Attribute').name === block.attribute && record.getCellValue('Category').name === block.category)
                    .map((choice) => (
                    <MenuItem key={choice.id} value={choice.getCellValue('Parameter')}>{choice.getCellValue('Parameter')}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <Button variant="text" onClick={() => removeBlock(blockIndex)}>Remove Block</Button>
            </Grid>
          </Grid>
        ))}
        <Button variant="text" onClick={() => setBlocks([...blocks, {name: 'Audience', attribute: '', category: '', parameter: ''}])} >Add Block</Button>
      </FormGroup>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" disabled={!cursor?.selectedRecordIds?.length} onClick={runAutomation}>
          Create refreshed creatives
        </Button>
      </Stack>
      <List disablePadding>
        {errors.map((error) => (
          <ListItem key={error.message}>
            <ListItemButton dense>
              <ListItemIcon>
                <ErrorIcon />
              </ListItemIcon>
              <ListItemText primary={error.message} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List disablePadding>
        {success.map((succes) => (
          <ListItem key={succes.message}>
            <ListItemButton dense>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary={succes.message} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}
