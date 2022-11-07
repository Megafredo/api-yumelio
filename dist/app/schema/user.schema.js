const userSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        passwordConfirm: { type: 'string' },
        linkedin_url: { type: 'string' },
        github_url: { type: 'string' },
        instagram_url: { type: 'string' }
    },
    required: ['email', 'password', 'passwordConfirm'],
    additionalProperties: false
};
const userUpdateSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        password: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        passwordConfirm: { type: 'string' },
        linkedin_url: { type: 'string' },
        github_url: { type: 'string' },
        instagram_url: { type: 'string' }
    },
    required: [],
    additionalProperties: false
};
export { userSchema, userUpdateSchema };
//# sourceMappingURL=user.schema.js.map