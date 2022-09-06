const userSchema = {
    type: "object",
    properties: {
        first_name: { type: "string", nullable: true },
        last_name: { type: "string", nullable: true },
        email: { type: "string" },
        password: { type: "string" },
        passwordConfirm: { type: "string" },
        linkedin_url: { type: "string", nullable: true },
        github_url: { type: "string", nullable: true },
        instagram_url: { type: "string", nullable: true }
    },
    required: ["email", "password", "passwordConfirm"],
    additionalProperties: false
};
export { userSchema };
//# sourceMappingURL=user.schema.js.map