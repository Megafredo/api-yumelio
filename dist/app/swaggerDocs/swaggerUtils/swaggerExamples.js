const required = {
    signUp: ['username', 'email', 'password', 'passwordConfirm'],
    signIn: ['email', 'password']
};
const example = {
    signUp: {
        first_name: 'Yumedo',
        last_name: 'Yumedo',
        email: 'yumedo@survivor.com',
        password: 'N6y$Ozddzt=1aa',
        passwordConfirm: 'N6y$Ozddzt=1aa'
    },
    signIn: {
        email: 'yumedo@survivor.com',
        password: 'N6y$Ozddzt=1aa'
    },
    signInOk: {
        id: 'integer',
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        accessToken: 'string',
        refreshToken: 'string'
    },
    refreshTokenOk: {
        accessToken: 'string',
        refreshToken: 'string'
    },
    updateUser: {
        first_name: 'Yumedo',
        last_name: 'Yumedo',
        email: 'yumedo@survivor.com',
        password: 'N6y$Ozddzt=1aa',
        passwordConfirm: 'N6y$Ozddzt=1aa',
        linkedin_url: 'https://linkedin-url.com/',
        github_url: 'https://github-url.com/',
        instagram_url: 'https://instagram-url.com/'
    }
};
const properties = {
    signUp: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' }
    },
    signIn: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    signInOk: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
    },
    refreshTokenOk: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
    },
    updateUser: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
        linkedin_url: { type: 'string' },
        github_url: { type: 'string' },
        instagram_url: { type: 'string' }
    }
};
const tableSql = {
    user: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        first_name: { type: 'TEXT NULL' },
        last_name: { type: 'TEXT NULL' },
        email: { type: 'EMAIL NOT NULL UNIQUE' },
        password: { type: 'PWD NOT NULL' },
        linkedin_url: { type: 'LINK_URL NULL' },
        github_url: { type: 'LINK_URL NULL' },
        instagram_url: { type: 'LINK_URL NULL' },
        role_id: { type: 'INTEGER NOT NULL DEFAULT 3' }
    }
};
const infoReturn = {
    oneUser: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        linkedin_url: { type: 'string' },
        github_url: { type: 'string' },
        instagram_url: { type: 'string' }
    },
    signInUser: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
    },
};
export { required, example, properties, tableSql, infoReturn };
//# sourceMappingURL=swaggerExamples.js.map