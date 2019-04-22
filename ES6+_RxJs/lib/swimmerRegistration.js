"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawForm = drawForm;
function drawForm(host) {
    var formDiv = document.createElement("div");
    formDiv.className = "login-form";
    host.appendChild(formDiv);

    var label = document.createElement("label");
    label.innerHTML = "Swimmer registration";
    host.appendChild(label);

    drawContainer(formDiv, "First name", false);
    drawContainer(formDiv, "Last name", false);
    drawContainer(formDiv, "Club", false);
    drawContainer(formDiv, "Select events(Use CTRL for multiple selection)", true);
}

function drawContainer(host, lblText, bool) {
    var container = document.createElement("div");
    container.className = "login-component";
    host.appendChild(container);

    var label = document.createElement("label");
    label.innerHTML = lblText;
    container.appendChild(label);

    if (!bool) {
        var tbx = document.createElement("input");
        container.appendChild(tbx);
    } else {
        var dropDown = document.createElement("select");
        dropDown.name = "Category";
        dropDown.multiple = true;
        container.appendChild(dropDown);

        addEvent(dropDown, "50m Freestyle", "50free");
        addEvent(dropDown, "100m Freesyle", "100free");
        addEvent(dropDown, "200m Freesyle", "200free");
        addEvent(dropDown, "50m Backstroke", "50back");
        addEvent(dropDown, "100m Backstroke", "100back");
        addEvent(dropDown, "200m Backstroke", "200back");
        addEvent(dropDown, "50m Butterfly", "50fly");
        addEvent(dropDown, "100m Butterfly", "100fly");
        addEvent(dropDown, "200m Butterfly", "200fly");
        addEvent(dropDown, "50m Breastsroke", "50breast");
        addEvent(dropDown, "100m Breaststroke", "100breast");
        addEvent(dropDown, "200m Breaststroke", "200breast");
        addEvent(dropDown, "200m Individual Medley", "200IM");
        addEvent(dropDown, "400m Individual Medley", "400IM");
    }
}

function addEvent(host, event, evValue) {
    var ddOption = document.createElement("option");
    ddOption.innerHTML = event;
    ddOption.value = evValue;
    host.appendChild(ddOption);
}