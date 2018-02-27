const express = require("express");
const { Pool, Client } = require('pg');
const fs = require('fs');
const config = require("./config");
const configureQuery = require("./lib/pool");
const server = express();

let pool = new Pool(config.db);
server.connection = pool;

configureLibs(server);
configureAPIEndpoints(server);
configureSQL(server);
configureQuery(server);

// server.client.query(server.sql.categoriesGet)
//     .then(results=>{
//         console.log(results);
//     });

// server.db.query(server.sql.categoriesGet, (err, res) => {
//     console.log(err, res);
// });

server.listen(8000, () => {
    console.log(`Running on port 8000`);
});

function configureAPIEndpoints(server) {
    const handlerDir = "./api/";

    console.log("API Endpoint Handlers:");
    let apiFiles = fs.readdirSync("./api/");
    apiFiles.forEach(function (filename) {
        if (filename.endsWith("Handler.js")) {
            console.log("...", filename);
            require(handlerDir + filename)(server);
        }
    });
}

function configureLibs(server) {
    const libDir = "./lib/";
    let libFiles = fs.readdirSync(libDir);
    console.log("lib files:", libFiles);
    libFiles.forEach(function (fileName) {
        console.log(":", fileName);
        if (fileName.endsWith(".js")) {
            let libName = fileName.split(".")[0];
            console.log("...", libName);
            server[libName] = require(libDir + fileName)(server);
        }
    })
}

function configureSQL(server) {
    server.sql = {};
    const sqlDir = "./sql/";
    let sqlFiles = fs.readdirSync(sqlDir);
    console.log("sql files", sqlFiles);
    sqlFiles.forEach(function (fileName) {
        if (fileName.endsWith(".sql")) {
            let sqlName = fileName.split(".")[0];
            console.log("...", sqlName);
            server.sql[sqlName] = fs.readFileSync(sqlDir + fileName).toString();
        }
    })
}

Array.prototype.mapObjToValues = function (obj) {
    const arr = this;
    // console.log("this is: ", arr);
    arr.forEach((key, index) => {
        arr[index] = obj[key];
    });
    // console.log("arr", arr);
    return this;
};
