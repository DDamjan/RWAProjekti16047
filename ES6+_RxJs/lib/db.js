"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.returnFromDB = returnFromDB;
exports.sendSwimmerToDB = sendSwimmerToDB;
exports.postToDB = postToDB;

var _rxjs = require("rxjs");

function returnFromDB(table) {
    return (0, _rxjs.from)(fetch("http://localhost:3000/" + table).then(function (res) {
        return res.json();
    }));
}

function sendSwimmerToDB(swimmerArray) {
    swimmerArray.forEach(function (s) {
        var body = s;
        postToDB(body, "Swimmers");
    });
}

function postToDB(body, table) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return fetch("http://localhost:3000/" + table, options).then(function (response) {
        return response.json;
    });
}