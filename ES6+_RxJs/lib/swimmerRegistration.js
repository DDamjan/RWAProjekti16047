"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Registration = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require("./db");

var _Swimmer = require("./Swimmer");

var _functions = require("./functions");

var _competition = require("./competition");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registration = exports.Registration = function () {
    function Registration() {
        _classCallCheck(this, Registration);

        this.swimmers = new Array();

        (0, _db.populateSwimmers)(this.swimmers);
    }

    _createClass(Registration, [{
        key: "drawForm",
        value: function drawForm(host) {
            var formDiv = document.createElement("div");
            formDiv.className = "register-form";
            host.appendChild(formDiv);

            var label = document.createElement("label");
            label.className = "registration-label";
            label.innerHTML = "Swimmer registration";
            formDiv.appendChild(label);

            this.drawContainer(formDiv, "First name", "first-name", "", false);
            this.drawContainer(formDiv, "Last name", "last-name", "", false);
            this.drawContainer(formDiv, "Club", "club", "", false);
            this.drawContainer(formDiv, "Select event", "event-selection", "", true);
            this.drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

            var Cleave = require('cleave.js');
            var c = new Cleave('.register-input-pb', {
                time: true,
                timePattern: ['h', 'm', 's']
            });

            this.drawButtons(formDiv);

            var toCompetitionDiv = document.createElement("div");
            toCompetitionDiv.className = "register-component";
            formDiv.appendChild(toCompetitionDiv);

            var btnCompetition = document.createElement("button");
            btnCompetition.className = "btn-competition";
            btnCompetition.innerHTML = "Proceed to competition";
            toCompetitionDiv.appendChild(btnCompetition);

            btnCompetition.onclick = function (ev) {
                host.innerHTML = "";
                var c = new _competition.competition();
                c.log();
                c.drawCompetition(host);
            };
        }
    }, {
        key: "drawContainer",
        value: function drawContainer(host, lblText, name, desc, bool) {
            var _this = this;

            var container = document.createElement("div");
            container.className = "register-component";
            host.appendChild(container);

            var label = document.createElement("label");
            label.innerHTML = lblText;
            label.className = "reg-component-label";
            container.appendChild(label);

            if (!bool) {
                if (name != "event-pb") {
                    var tbx = document.createElement("input");
                    tbx.name = name;
                    tbx.className = "register-input";
                    tbx.placeholder = desc;
                    container.appendChild(tbx);
                } else {
                    var _tbx = document.createElement("input");
                    _tbx.name = name;
                    _tbx.className = "register-input-pb";
                    _tbx.placeholder = desc;
                    container.appendChild(_tbx);
                }
            } else {
                var dropDown = document.createElement("select");
                dropDown.name = name;
                dropDown.className = "register-input";
                container.appendChild(dropDown);

                (0, _db.getFromDB)("eventCount").subscribe(function (evCount) {
                    for (var i = 1; i <= evCount.count; i++) {
                        (0, _db.getFromDB)("events/" + i).subscribe(function (res) {
                            _this.addEvent(dropDown, res.title, res.evID);
                        });
                    }
                });
            }
        }
    }, {
        key: "addEvent",
        value: function addEvent(host, event, evValue) {
            var ddOption = document.createElement("option");
            ddOption.innerHTML = event;
            ddOption.value = evValue;
            host.appendChild(ddOption);
        }
    }, {
        key: "drawButtons",
        value: function drawButtons(host) {
            var _this2 = this;

            var container = document.createElement("div");
            container.className = "register-buttons";
            host.appendChild(container);

            var btnAdd = document.createElement("button");
            btnAdd.innerHTML = "Add";
            btnAdd.className = "btn-add";
            container.appendChild(btnAdd);

            btnAdd.onclick = function (ev) {
                var firstName = document.querySelector('input[name="first-name"]');
                var lastName = document.querySelector('input[name="last-name"]');
                var club = document.querySelector('input[name="club"]');
                var event = document.querySelector('select[name="event-selection"]');
                var selectedEvent = event.options[event.selectedIndex];
                var eventPB = document.querySelector('input[name="event-pb"]');

                if (firstName.value === "" || lastName.value === "" || club.value === "") {
                    alert("Please fill in all fields before adding!");
                } else {
                    (0, _db.getFromDB)("swimmerCount").subscribe(function (res) {
                        var id = res.count + 1;
                        var exp = parseInt(Math.random() * 100);

                        var pb = (0, _functions.reformatTime)(eventPB.value);
                        var s = new _Swimmer.swimmer(id, firstName.value, lastName.value, club.value, selectedEvent.value, pb, exp);
                        _this2.swimmers.push(s);
                        var sCount = { count: id };
                        (0, _db.postToDB)(sCount, "swimmerCount");
                        firstName.value = "";
                        lastName.value = "";
                        club.value = "";
                        eventPB.value = "";
                    });
                }
            };

            var btnSubmit = document.createElement("button");
            btnSubmit.innerHTML = "Submit";
            btnSubmit.className = "btn-submit";
            container.appendChild(btnSubmit);

            btnSubmit.onclick = function (ev) {
                (0, _db.getFromDB)("swimmerCount").subscribe(function (res) {
                    if (_this2.swimmers.length != 0) {
                        (0, _db.postToDB)(_this2.swimmers, "Swimmers");
                    } else {
                        alert("No swimmers registered! At least one swimmer needs to be registered!");
                    }
                });
            };
        }
    }]);

    return Registration;
}();