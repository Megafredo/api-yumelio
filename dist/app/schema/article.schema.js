const articleSchema = {
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
//# sourceMappingURL=article.schema.js.map