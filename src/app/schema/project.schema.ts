import { JSONSchemaType } from 'ajv';
import { ProjectSchema } from '../Types/custom.js';

const projectSchema: JSONSchemaType<ProjectSchema> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    abstract: { type: 'string' },
    content: { type: 'string' },
    picture: { type: 'string' },
    is_active: { type: 'boolean', nullable: true },
    date: { type: 'string' },
    link: { type: 'string', nullable: true },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'number' } },
      },
      nullable: true,
    },
  },
  required: ['title', 'abstract', 'content', 'picture', 'date'],
  additionalProperties: false,
};

export { projectSchema };
