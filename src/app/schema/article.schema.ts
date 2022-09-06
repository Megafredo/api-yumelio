import {JSONSchemaType} from "ajv"

interface ArticleSchema {
    title: string;
    abstract: string;
    content: string;
}

const articleSchema: JSONSchemaType<ArticleSchema> = {
    type: "object",
    properties: {
        title: { type: "string" },
        abstract: { type: "string" },
        content: { type: "string" }
    },
    required: ["title", "abstract", "content"],
    additionalProperties: false
};


export { articleSchema };