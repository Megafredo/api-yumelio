const projectRequired = {
    createProject: ['title', 'abstract', 'content', 'picture', 'date'],
    updateProject: ['user_id']

};
const projectExample = {
    createProject: {
        title: "Super projet !",
        abstract: "Description de mon projet",
        content: "Ceci est mon projet",
        picture: "http://www.myPicture.com",
        date: "10 Mars 2022",
        link: "http://www.myLink.com"
    },
    updateProject: {
        title: "Super projet modifié !",
        abstract: "Description de mon projet modifié",
        content: "Ceci est mon projet modifié",
        picture: "http://www.myPicture.com",
        date: "10 Mars 2022",
        link: "http://www.myLink.com"
    }
};
const projectProperties = {

    createProject: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        date: { type: 'string' },
        link: { type: 'string' }
    },

    updateProject: {
        title: { type: 'string' },
        abstract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        date: { type: 'string' },
        link: { type: 'string' }
    }

};

const projectInfoReturn = {

    //~ ---------------- All Articles By User
    projectsByUser: {
        article_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        date: { type: 'string' },
        link: { type: 'string' }
    },

    //~ ---------------- One Articles By User
    projectByUser: {
        article_id: { type: 'integer' },
        title: { type: 'string' },
        abtract: { type: 'string' },
        content: { type: 'string' },
        picture: { type: 'string' },
        date: { type: 'string' },
        link: { type: 'string' }
    }

};

export { projectRequired, projectExample, projectProperties, projectInfoReturn };