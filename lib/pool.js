module.exports = function (server) {
    db = {};

    db.query = (query, params) => {
        const parsedQuery = queryFormatter(query, params);
        console.log("parsed query", parsedQuery);
        return new Promise(function (resolve, reject) {
            return server.connection.query(parsedQuery)
                .then(results => {
                    // console.log("results", results);
                    if (results) {
                        resolve(results);
                    } else {
                        reject("Error, pool query");
                    }

                })
        })
    };

    db.first = (query, params) => {
        const parsedQuery = queryFormatter(query, params);
        console.log("parsed query", parsedQuery);
        return new Promise(function (resolve, reject) {
            return server.connection.query(parsedQuery)
                .then(results => {
                    // console.log("results", results);
                    if (results) {
                        resolve(results.rows[0]);
                    } else {
                        reject("Error, query");
                    }

                })
        })
    };

    server.pool = db;
};

// Replaces tokens in the .sql
function queryFormatter(query, values) {
    const allowedValues = ["asc", "desc"];

    if (!values) return query;

    // Replace ::: tokens with their unescaped values.  The values
    // must appear in the whitelist above; otherwise SQL injection
    // is possible.
    let qry = query.replace(/[^:]:::(\w+)/g, function (txt, key) {
        let prefix = txt.substring(0, txt.indexOf(":"));
        if (values.hasOwnProperty(key) &&
            allowedValues.indexOf(values[key].toLowerCase()) > -1) {
            return prefix + values[key];
        }
        return txt;
    }.bind(this));

    // Replace :: tokens with their values.  These are coerced by
    // the mysql library to be identifiers (they receive surrounding backticks)
    qry = qry.replace(/[^:]::(\w+)/g, function (txt, key) {
        let prefix = txt.substring(0, txt.indexOf(":"));
        if (values.hasOwnProperty(key)) {
            return prefix + this.escapeId(values[key]);
        }
        return txt;
    }.bind(this));

    // Replace : tokens with their escaped values.
    qry = qry.replace(/[^:]:(\w+)/g, function (txt, key) {
        let prefix = txt.substring(0, txt.indexOf(":"));
        if (values.hasOwnProperty(key)) {
            let x = this.escape(values[key]);
            return `'${x}'`;
        }
        return txt;
    }.bind(this));

    // suppress printing out inserts into the security log (SPAM!)
    if (!values.suppressLogs) {
        if (process.env.LOG_SQL) {
            console.log(qry);
        }
    }

    return qry;
}