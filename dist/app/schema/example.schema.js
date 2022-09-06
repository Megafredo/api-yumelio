import Ajv from "ajv";
const ajv = new Ajv();
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
function validate(req, res, next) {
    const validate = ajv.compile(userSchema);
    if (validate(req.body)) {
        console.log("OK ---------------------------");
    }
    else {
        console.log("ERROR ---------------------------", validate.errors);
    }
}
export { userSchema, validate };
//# sourceMappingURL=example.schema.js.map