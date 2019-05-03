"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromDB = getFromDB;
exports.postToDB = postToDB;
exports.populateSwimmers = populateSwimmers;

var _rxjs = require("rxjs");

function getFromDB(table) {
    return (0, _rxjs.from)(fetch("http://localhost:3000/" + table).then(function (res) {
        return res.json();
    }));
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

function populateSwimmers(swimmers) {
    getFromDB("Swimmers").subscribe(function (res) {
        if (res.count != 0) {
            getFromDB("swimmerCount").subscribe(function (count) {
                for (var i = 0; i < count.count; i++) {
                    var s = res[i];
                    swimmers.push(s);
                }
            });
        }
    });
}