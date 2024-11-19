import { initializeBlock, useBase, useCursor, useLoadable, useWatchable } from "@airtable/blocks/ui";
import React from "react";

import AutomaitionList from "./automation-list";

function MarketingCloudUIApp() {
  const cursor = useCursor();
  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the active Table
  useWatchable(cursor, ["activeTableId"]);

  const base = useBase();
  const table = base.getTableById(cursor.activeTableId);
  return <AutomaitionList base={base} table={table}/>;
}

initializeBlock(() => <MarketingCloudUIApp />);
