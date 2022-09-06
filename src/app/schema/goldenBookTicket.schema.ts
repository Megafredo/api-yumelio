import {JSONSchemaType} from "ajv"

interface GbTicketSchema {
    content: string;
}

const gbTicketSchema: JSONSchemaType<GbTicketSchema> = {
    type: "object",
    properties: {
        content: { type: "string" }
    },
    required: ["content"],
    additionalProperties: false
};

export { gbTicketSchema };