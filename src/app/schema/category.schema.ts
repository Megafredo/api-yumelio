import {JSONSchemaType} from "ajv"

interface CategorySchema {
    name: string;
    logo: string;
    color?: string;
}

const categorySchema: JSONSchemaType<CategorySchema> = {
    type: "object",
    properties: {
        name: { type: "string" },
        logo: { type: "string" },
        color: { type: "string", nullable: true } 
    },
    required: ["name", "logo"],
    additionalProperties: false
};


export { categorySchema };