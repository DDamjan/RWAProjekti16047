"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawWelcome = drawWelcome;

var _SwimmerRegistration = require("./SwimmerRegistration");

var _competition = require("./competition");

function drawWelcome(host) {
    host.style.backgroundImage = 'url("../resources/welcome.jpg")';
    host.style.backgroundSize = "cover";
    host.style.backgroundColor = "#0c0129";
    host.style.backgroundBlendMode = "soft-light";

    var container = document.createElement("div");
    container.className = "welcome-div";
    host.appendChild(container);

    var span1 = document.createElement("span");
    span1.className = "Welcome-title";
    span1.innerHTML = "Swim on net";
    container.appendChild(span1);

    var span2 = document.createElement("span");
    span2.className = "subtitle";
    span2.innerHTML = "Swimming competition simulation built using ES6+ and RxJS.";
    container.appendChild(span2);

    var span3 = document.createElement("span");
    span3.className = "credits";
    span3.innerHTML = "Created by Damjan Denic 16047 as a RWA class project.";
    container.appendChild(span3);

    var btnContainer = document.createElement("div");
    btnContainer.className = "welcome-buttons";
    container.appendChild(btnContainer);

    var btnRegister = document.createElement("button");
    btnRegister.className = "btn-welcome";
    btnRegister.innerHTML = "Register a team";
    btnContainer.appendChild(btnRegister);

    var btnSpectate = document.createElement("button");
    btnSpectate.className = "btn-welcome";
    btnSpectate.innerHTML = "Spectate meet";
    btnContainer.appendChild(btnSpectate);

    btnRegister.onclick = function (ev) {
        var registration = new _SwimmerRegistration.Registration();
        host.innerHTML = "";
        registration.drawForm(host);
    };

    btnSpectate.onclick = function (ev) {
        document.body.innerHTML = "";
        var c = new _competition.competition();
        c.log();
    };
}