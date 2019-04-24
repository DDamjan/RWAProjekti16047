"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Registration = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require("rxjs");

var _db = require("./db.js");

var _Swimmer = require("./Swimmer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registration = exports.Registration = function () {
    function Registration() {
        _classCallCheck(this, Registration);

        this.swimmers = new Array();
    }

    _createClass(Registration, [{
        key: "drawForm",
        value: function drawForm(host) {
            var formDiv = document.createElement("div");
            formDiv.className = "login-form";
            host.appendChild(formDiv);

            var label = document.createElement("label");
            label.innerHTML = "Swimmer registration";
            host.appendChild(label);

            this.drawContainer(formDiv, "First name", "first-name", "", false);
            this.drawContainer(formDiv, "Last name", "last-name", "", false);
            this.drawContainer(formDiv, "Club", "club", "", false);
            this.drawContainer(formDiv, "Select event", "event-selection", "", true);
            this.drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

            this.drawButtons(host);
        }
    }, {
        key: "drawContainer",
        value: function drawContainer(host, lblText, name, desc, bool) {
            var _this = this;

            var container = document.createElement("div");
            container.className = "login-component";
            host.appendChild(container);

            var label = document.createElement("label");
            label.innerHTML = lblText;
            container.appendChild(label);

            if (!bool) {
                var tbx = document.createElement("input");
                tbx.name = name;
                tbx.placeholder = desc;
                container.appendChild(tbx);
            } else {
                var dropDown = document.createElement("select");
                dropDown.name = name;
                container.appendChild(dropDown);

                (0, _db.returnFromDB)("eventCount").subscribe(function (evCount) {
                    for (var i = 1; i <= evCount.count; i++) {
                        (0, _db.returnFromDB)("events/" + i).subscribe(function (res) {
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
            container.className = "login-component";
            host.appendChild(container);

            var btnAdd = document.createElement("button");
            btnAdd.innerHTML = "Add";
            container.appendChild(btnAdd);

            btnAdd.onclick = function (ev) {
                var firstName = document.querySelector('input[name="first-name"]').value;
                var lastName = document.querySelector('input[name="last-name"]').value;
                var club = document.querySelector('input[name="club"]').value;
                var event = document.querySelector('select[name="event-selection"]');
                var selectedEvent = event.options[event.selectedIndex].value;
                var eventPB = document.querySelector('input[name="event-pb"]').value;

                if (firstName === "" || lastName === "" || club === "") {
                    alert("Please fill in all fields before submititng!");
                } else {
                    (0, _db.returnFromDB)("swimmerCount").subscribe(function (res) {
                        var id = res.count + 1;
                        var s = new _Swimmer.swimmer(id, firstName, lastName, club, selectedEvent, eventPB);
                        _this2.swimmers.push(s);

                        var sCount = { count: id };
                        (0, _db.postToDB)(sCount, "swimmerCount");
                    });
                }
            };

            var btnSubmit = document.createElement("button");
            btnSubmit.innerHTML = "Submit";
            container.appendChild(btnSubmit);

            btnSubmit.onclick = function (ev) {
                (0, _db.postToDB)(_this2.swimmers, "Swimmers");
            };
        }
    }]);

    return Registration;
}();