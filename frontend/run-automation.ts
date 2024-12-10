import { AUTOMATION_STATUS } from "./automation-status/automation-status.enum";
import { REACT_APP_SERVER_URL } from "./constants";
import { Automation } from "./automation-status/types";

export default async function runAutomation<T>(url: string, selectedRecordIds: string[], data: T, setAutomations: (automations: Automation[]) => void) {
  const newAutomations: Automation[] = selectedRecordIds.map((recordId) => ({ id: recordId, status: AUTOMATION_STATUS.IN_PROGGRESS }));
  setAutomations([...newAutomations]);
  for (const [index, recordId] of selectedRecordIds.entries()) {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}${url}`, {
        method: 'POST',
        body: JSON.stringify({id: recordId, ...data}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await response.json();

      newAutomations[index] = { ...newAutomations[index], status: AUTOMATION_STATUS.DONE };
      setAutomations([...newAutomations]);
    } catch (e) {
      newAutomations[index] = { ...newAutomations[index], status: AUTOMATION_STATUS.ERROR, message: e.message };
      setAutomations([...newAutomations]);
    }
  }
};
