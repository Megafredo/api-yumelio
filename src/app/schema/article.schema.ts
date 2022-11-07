import { JSONSchemaType } from "ajv";
import { ArticleSchema } from '../Types/custom.js';


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