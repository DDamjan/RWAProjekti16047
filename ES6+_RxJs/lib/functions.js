"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reformatTime = reformatTime;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function reformatTime(time) {
    var x = time.slice(0, 2);
    var i = 3;
    while (i < 7) {
        x += time.slice(i, i + 2);
        i += 3;
    }
    var minute = parseInt(x / 10000);
    var second = parseInt(x / 100 % 100);
    var milisecond = parseInt(x % 100);

    return minute * 60000 + second * 1000 + milisecond;
}