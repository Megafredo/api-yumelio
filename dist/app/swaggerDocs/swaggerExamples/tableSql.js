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
    },
    role: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        name: { type: 'TEXT NOT NULL' }
    },
    article: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        title: { type: 'TEXT NOT NULL' },
        abstract: { type: 'TEXT NOT NULL' },
        content: { type: 'TEXT NOT NULL' },
        order: { type: 'SERIAL' },
        user_id: { type: 'INTEGER NOT NULL' }
    },
    project: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        title: { type: 'TEXT NOT NULL' },
        abstract: { type: 'TEXT NOT NULL' },
        content: { type: 'TEXT NOT NULL' },
        picture: { type: 'LINK_URL NOT NULL' },
        is_active: { type: 'BOOLEAN NOT NULL DEFAULT TRUE' },
        date: { type: 'TEXT NOT NULL' },
        user_id: { type: 'INTEGER NOT NULL' },
        link: { type: 'LINK_URL NULL' }
    },
    gbTicket: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        content: { type: 'TEXT NOT NULL' },
        created_at: { type: 'TIMESTAMPTZ NOT NULL DEFAULT NOW()' },
        user_id: { type: 'INTEGER NOT NULL' }
    },
    category: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        name: { type: 'TEXT NOT NULL' },
        logo: { type: 'TEXT NOT NULL' },
        color: { type: 'TEXT' }
    },
    project_has_category: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        project_id: { type: 'INTEGER NOT NULL' },
        category_id: { type: 'INTEGER NOT NULL' },
    },
    article_has_category: {
        id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
        article_id: { type: 'INTEGER NOT NULL' },
        category_id: { type: 'INTEGER NOT NULL' },
    }
};
export { tableSql };
//# sourceMappingURL=tableSql.js.map