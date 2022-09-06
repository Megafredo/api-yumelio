const projectSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        abstract: { type: "string" },
        content: { type: "string" },
        picture: { type: "string" },
        date: { type: "string" },
        link: { type: "string", nullable: true }
    },
    required: ["title", "abstract", "content", "picture", "date"],
    additionalProperties: false
};
export { projectSchema };
//# sourceMappingURL=project.schema.js.map