import { JSONSchemaType } from 'ajv';

interface ProjectSchema {
    title: string;
    abstract: string;
    content: string;
    picture: string;
    is_active?: boolean;
    date: string;
    link?: string;
    categories?: object[];
}

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
                properties: { id:{type: 'number', nullable: true} },
            },
            nullable: true
        }
    },
    required: ['title', 'abstract', 'content', 'picture', 'date'],
    additionalProperties: false
};

export { projectSchema };
