const projectRequired = {
    createProject: ['title', 'abstract', 'content', 'picture', 'date'],
    updateProject: ['id', 'user_id']
};
const projectExample = {
    createProject: {
        title: 'Super projet !',
        abstract: 'Description de mon projet',
        content: 'Ceci est mon projet',
        picture: 'http://www.myPicture.com',
        is_active: true,
        date: '10 Mars 2022',
        link: 'http://www.myLink.com',
        categories: [{ id: 1 }, { id: 3 }, { id: 8 }]
    },
    updateProject: {
        title: 'Super projet modifié !',
        abstract: 'Description de mon projet modifié',
        content: 'Ceci est mon projet modifié',
        picture: 'http://www.myPicture.com',
        is_active: true,
        date: '10 Mars 2022',
        link: 'http://www.myLink.com',
        categories: [{ id: 10, old_category: 1 }, { id: 3 }, { id: 8 }]
    }
};
const projectProperties = {
    createProject: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        is_active: { type: 'boolean' },
        date: { type: 'string' },
        link: { type: 'string' },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    },
    updateProject: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        is_active: { type: 'boolean' },
        date: { type: 'string' },
        link: { type: 'string' },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    old_category: { type: 'integer' }
                }
            }
        }
    }
};
const projectInfoReturn = {
    projectsByUser: {
        project_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        is_active: { type: 'boolean' },
        date: { type: 'string' },
        link: { type: 'string' },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    logo: { type: 'string' },
                    color: { type: 'string' }
                }
            }
        }
    },
    projectByUser: {
        project_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        is_active: { type: 'boolean' },
        date: { type: 'string' },
        link: { type: 'string' },
        categories: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    logo: { type: 'string' },
                    color: { type: 'string' }
                }
            }
        }
    }
};
export { projectRequired, projectExample, projectProperties, projectInfoReturn };
//# sourceMappingURL=project.js.map