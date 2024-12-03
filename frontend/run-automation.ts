import { SERVER_URL } from "./constants";
import { Automation } from "./types";

export default async function runAutomation<T>(url: string, selectedRecordIds: string[], data: T, setAutomations: (automations: Automation[]) => void) {
  const newAutomations = [];
  setAutomations([...newAutomations]);
  for (const recordId of selectedRecordIds) {
    const index = newAutomations.length;
    newAutomations.push({ id: recordId, status: 'in progress' });
    setAutomations([...newAutomations]);
    try {
      const response = await fetch(`${SERVER_URL}${url}`, {
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

      newAutomations[index] = { ...newAutomations[index], status: 'done' };
      setAutomations([...newAutomations]);
    } catch (e) {
      newAutomations[index] = { ...newAutomations[index], status: 'error', message: e.message };
      setAutomations([...newAutomations]);
    }
  }
};
