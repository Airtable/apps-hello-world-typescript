import { optionIs, rankWith } from '@jsonforms/core';

export default rankWith(
  100, //increase rank as needed
  optionIs('format', 'block')
);
