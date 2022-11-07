import { JSONSchemaType } from 'ajv';
import { GoldenBookTicketSchema } from '../Types/custom.js';

const gbTicketSchema: JSONSchemaType<GoldenBookTicketSchema> = {
  type: 'object',
  properties: {
    content: { type: 'string' },
  },
  required: ['content'],
  additionalProperties: false,
};

export { gbTicketSchema };
