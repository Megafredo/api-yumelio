const goldenBookTicketRequired = {

    createGoldenBookTicket: ['content'],
    updateGoldenBookTicket: ['id']

};
const goldenBookTicketExample = {

    createGoldenBookTicket:{
        content : "Mon super commentaire pour le golden book !"
    },

    updateGoldenBookTicket:{
        content : "Mon super commentaire modifié pour le golden book !"
    }

};

const goldenBookTicketProperties = {

};

const goldenBookTicketInfoReturn = {

    allGoldenBookTickets: {
        id: { type: 'integer'},
        content: { type: 'string'},
        created_at: { type: 'string' },
    }
};

export { goldenBookTicketRequired, goldenBookTicketExample, goldenBookTicketProperties, goldenBookTicketInfoReturn };