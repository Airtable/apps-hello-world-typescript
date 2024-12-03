export type Block = {
  name: string,
  attribute: string,
  category: string,
  parameter: string,
}

export type Automation = {
  id: string,
  status: 'error' | 'done' | 'in progress',
  message: string,
}