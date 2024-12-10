import { AUTOMATION_STATUS } from "./automation-status.enum"

export type Automation = {
  id: string,
  status: AUTOMATION_STATUS,
  message?: string,
}