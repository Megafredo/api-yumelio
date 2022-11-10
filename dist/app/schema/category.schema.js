const categorySchema = {
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
//# sourceMappingURL=category.schema.js.map