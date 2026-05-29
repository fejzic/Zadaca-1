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
    },

    statusFilter: {
        active: "Aktivni",
        inactive: "Neaktivni",
        all: "Svi"
    },

    statusTable: {
    active: "Aktivan",
    inactive: "Neaktivan"
},

clinetsNames:{
    client1: "Hotel Pino",
    client2: "Sarajevo"
},

sortFiltersOptions: {
    default: "Bez sortiranja",
    nameAsc: "Naziv A-Z",
    revenueDesc: "Prihod najveći"
},

deleteClient:{
    client: "Top Gear Sarajevo"
},

reportTypes: {
    daily: "Dnevni izvještaj",
    weekly: "Sedmični izvještaj",
    monthly: "Mjesečni izvještaj"
},

emailForNotification: {
    validEmail: "qa@test.ba"
}
};

module.exports = testData;