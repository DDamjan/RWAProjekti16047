"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawForm = drawForm;

var _rxjs = require("rxjs");

function drawForm(host) {
    var formDiv = document.createElement("div");
    formDiv.className = "login-form";
    host.appendChild(formDiv);

    var label = document.createElement("label");
    label.innerHTML = "Swimmer registration";
    host.appendChild(label);

    drawContainer(formDiv, "First name", "first-name", "", false);
    drawContainer(formDiv, "Last name", "last-name", "", false);
    drawContainer(formDiv, "Club", "club", "", false);
    drawContainer(formDiv, "Select event", "event-selection", "", true);
    drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

    var btn = document.createElement("button");
    btn.innerHTML = "Add";
    host.appendChild(btn);

    btn.onclick = function (ev) {
        var firstName = document.querySelector('input[name="first-name"]').value;
        var lastName = document.querySelector('input[name="last-name"]').value;
        var club = document.querySelector('input[name="club"]').value;
        var event = document.querySelector('select[name="event-selection"]');
        var selectedEvent = event.options[event.selectedIndex].value;
        var eventPB = document.querySelector('input[name="event-pb"]').value;

        if (firstName === "" || lastName === "" || club === "") {
            alert("Please fill in all fields before submititng!");
        } else {
            sendSwimmerToDB(firstName, lastName, club, selectedEvent, eventPB);
        }
    };
}

function drawContainer(host, lblText, name, desc, bool) {
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

        returnFromDB("eventCount").subscribe(function (evCount) {
            for (var i = 1; i <= evCount.count; i++) {
                returnFromDB("events/" + i).subscribe(function (res) {
                    addEvent(dropDown, res.title, res.evID);
                });
            }
        });
    }
}

function addEvent(host, event, evValue) {
    var ddOption = document.createElement("option");
    ddOption.innerHTML = event;
    ddOption.value = evValue;
    host.appendChild(ddOption);
}

function returnFromDB(table) {
    return (0, _rxjs.from)(fetch("http://localhost:3000/" + table).then(function (res) {
        return res.json();
    }));
}

function sendSwimmerToDB(firstName_, lastName_, club_, event_, PB_) {

    returnFromDB("swimmerCount").subscribe(function (res) {
        var id_ = res.count + 1;
        var data = {
            id: id_,
            firstName: firstName_,
            lastName: lastName_,
            club: club_,
            event: event_,
            PB: PB_
        };
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        var newCount = { count: id_ };
        var countOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCount)
        };
        postToDB(countOpt, "swimmerCount");
        postToDB(options, "swimmers");
        console.log("Poslato");
    });
}

function postToDB(options, table) {
    return fetch("http://localhost:3000/" + table, options).then(function (response) {
        return response.json;
    });
}