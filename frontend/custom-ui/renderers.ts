import { materialRenderers } from '@jsonforms/material-renderers';
import blockControlTester from './block-control-tester';
import BlockControl from './block-control';

export default [
  ...materialRenderers,
  //register custom renderers
  { tester: blockControlTester, renderer: BlockControl },
];
