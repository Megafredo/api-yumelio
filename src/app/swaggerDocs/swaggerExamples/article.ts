//& ----------------------------------------- REQUIRED
const articleRequired = {
    //~ ---------------- Article
    createArticle: ['title', 'abstract', 'content', 'user_id'],
    updateArticle: ['user_id']
};

//& ----------------------------------------- EXAMPLE
const articleExample = {
    //~ ---------------- Create Article
    createArticle: {
        title: 'Super article !',
        abstract: 'Yumelio API une expérience comme jamais',
        content: 'Ea exercitationem at aut velit odio aut. Autem architecto corrupti adipisci praesentium harum quia. Vel reprehenderit asperiores consequatur. Magnam non eaque. Laboriosam itaque vitae'
    },
    //~ ---------------- Update Article
    updateArticle: {
        title: 'Super article modifiééééééé !',
        abstract: 'Description de mon article modifié',
        content: 'Ceci est mon article modifié'
    }
};

//& ----------------------------------------- PROPERTIES
const articleProperties = {
    //~ ---------------- Create Article
    createArticle: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    },

    //~ ---------------- Update Article
    updateArticle: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    }
};

//& ---------------- Info return
const articleInfoReturn = {
    //~ ---------------- All Articles By User
    articlesByUser: {
        article_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    },

    //~ ---------------- One Articles By User
    articleByUser: {
        article_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    }
};

export { articleRequired, articleExample, articleProperties, articleInfoReturn };
