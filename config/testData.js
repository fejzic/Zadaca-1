const testData = {

    validUser: {
        email: "admin@proximus.ba",
        password: "test123"
    },

    invalidUser: {
        email: "wrong@test.com",
        password: "wrong123"
    },

    clientData: {
        client: "Hotel Pino",
        city: "Sarajevo",
        status: "Aktivan",
        type: "VIP",
        revenue: "2500 KM"

    },

    clientData2: {
        client: "Casa Columba",
        city: "Split",
        status: "Aktivan",
        type: "VIP",
        revenue: "2100 KM"
    }

};

module.exports = testData;