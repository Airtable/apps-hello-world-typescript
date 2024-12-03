import {
  useBase,
  useCursor,
  useLoadable,
  useRecordById,
  useWatchable,
} from "@airtable/blocks/ui";
import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';

function RecordListItem({view, recordId}) {
  const record = useRecordById(view, recordId);
  return <ListItem><ListItemText primary={record.name || 'unnamaded creative'}/></ListItem>;
}

export default function SelectedCreatives() {
  const cursor = useCursor();
  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the active Table
  useWatchable(cursor, ["activeTableId"]);

  const base = useBase();
  const view = base.getTableById(cursor.activeTableId).getViewById(cursor.activeViewId);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <p>
          Selected Creatives ({cursor.selectedRecordIds.length})
        </p>
      </Grid>
      <Grid size={12}>
        <List>
          {cursor.selectedRecordIds.map((recordId) => (
            <RecordListItem key={recordId} recordId={recordId} view={view} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
