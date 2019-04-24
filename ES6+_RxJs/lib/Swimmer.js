"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var swimmer = exports.swimmer = function swimmer(id, firstName, lastName, club, event, pb) {
    _classCallCheck(this, swimmer);

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.club = club;
    this.event = event;
    this.pb = pb;
    this.heat = 0;
    this.lane = 0;
    this.place = 0;
    this.time = 0;
    this.exp = 0; //odredjuje sansu za diskvalifikaciju. Veci broj -> manja sansa.
};