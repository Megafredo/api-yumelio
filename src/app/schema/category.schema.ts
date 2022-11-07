import { JSONSchemaType } from 'ajv';
import { CategorySchema } from '../Types/custom.js';

const categorySchema: JSONSchemaType<CategorySchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    logo: { type: 'string' },
    color: { type: 'string', nullable: true },
  },
  required: ['name', 'logo'],
  additionalProperties: false,
};

export { categorySchema };
