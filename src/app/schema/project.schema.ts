import {JSONSchemaType} from "ajv"

interface ProjectSchema {
    title: string;
    abstract: string;
    content: string;
    picture: string;
    date: string;
    link?: string;
}

const projectSchema: JSONSchemaType<ProjectSchema> = {
    type: "object",
    properties: {
        title: { type: "string" },
        abstract: { type: "string"},
        content: { type: "string"},
        picture: { type: "string" },
        date: { type: "string" },
        link: { type: "string", nullable: true }
    },
    required: ["title", "abstract", "content", "picture", "date"],
    additionalProperties: false
};

export { projectSchema };