const userSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string', nullable: true },
        last_name: { type: 'string', nullable: true },
        email: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        passwordConfirm: { type: 'string' },
        linkedin_url: { type: 'string', nullable: true },
        github_url: { type: 'string', nullable: true },
        instagram_url: { type: 'string', nullable: true }
    },
    required: ['email', 'password', 'passwordConfirm'],
    additionalProperties: false
};
export { userSchema };
//# sourceMappingURL=user.schema.js.map