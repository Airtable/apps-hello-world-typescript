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
import Typography from '@mui/material/Typography';

function RecordListItem({table, recordId}) {
  const record = useRecordById(table, recordId);
  return <ListItem><ListItemText primary={record.name || 'unnamaded creative'}/></ListItem>;
}

export default function SelectedCreatives({base, table}) {
  const cursor = useCursor();
  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the list of selected records
  useWatchable(cursor, ["selectedRecordIds"]);

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
            <RecordListItem key={recordId} recordId={recordId} table={table} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
