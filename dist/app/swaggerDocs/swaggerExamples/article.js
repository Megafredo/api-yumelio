const articleRequired = {
    createArticle: ['title', 'abstract', 'content', 'user_id'],
    updateArticle: ['user_id']
};
const articleExample = {
    createArticle: {
        title: 'Super article !',
        abstract: 'Yumelio API une expérience comme jamais',
        content: 'Ea exercitationem at aut velit odio aut. Autem architecto corrupti adipisci praesentium harum quia. Vel reprehenderit asperiores consequatur. Magnam non eaque. Laboriosam itaque vitae'
    },
    updateArticle: {
        title: 'Super article modifiééééééé !',
        abstract: 'Description de mon article modifié',
        content: 'Ceci est mon article modifié'
    }
};
const articleProperties = {
    createArticle: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    },
    updateArticle: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    }
};
const articleInfoReturn = {
    articlesByUser: {
        article_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        order: { type: 'integer' },
        user_id: { type: 'integer' }
    },
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
//# sourceMappingURL=article.js.map