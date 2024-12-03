import { initializeBlock, useBase, useCursor, useLoadable, useWatchable } from "@airtable/blocks/ui";
import React from "react";

import AutomaitionList from "./automation-list";

function MarketingCloudUIApp() {
  return <AutomaitionList />;
}

initializeBlock(() => <MarketingCloudUIApp />);
