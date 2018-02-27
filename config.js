process.env.PGUSER = "simpletonspeech";
process.env.PGHOST = "simpletonflashcards.cgxokme5qspi.us-west-2.rds.amazonaws.com";
process.env.PGPASSWORD = "buttercheesehambottle";
process.env.PGDATABASE = "simpletonflashcards";

module.exports = {
    db: {
        user: "simpletonspeech",
        host: "simpletonflashcards.cgxokme5qspi.us-west-2.rds.amazonaws.com",
        password: "buttercheesehambottle",
        database: "simpletonflashcards"
    }
};


// process.env.PGUSER = "admin"
// process.env.PGHOST = "simpletoncards:us-central1:simpleton-cards";
// process.env.PGPASSWORD = "Silver156";
// process.env.PGDATABASE = "simpleton-cards"