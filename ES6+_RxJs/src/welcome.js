import { Registration } from "./SwimmerRegistration";
import { competition } from "./competition";
import { createDiv } from "./functions";

export function drawWelcome(host) {
    createDiv(host, "welcome-div");
    let container = document.querySelector(".welcome-div");

    let span1 = document.createElement("span");
    span1.className = "Welcome-title";
    span1.innerHTML = "Swim on net";
    container.appendChild(span1);

    let span2 = document.createElement("span");
    span2.className = "subtitle";
    span2.innerHTML = "Swimming competition simulation built using ES6+ and RxJS.";
    container.appendChild(span2);

    let span3 = document.createElement("span");
    span3.className = "credits";
    span3.innerHTML = "Created by Damjan Denic 16047 as a RWA class project.";
    container.appendChild(span3);

    createDiv(container, "welcome-buttons");
    let btnContainer = document.querySelector(".welcome-buttons");

    let btnRegister = document.createElement("button");
    btnRegister.className = "btn";
    btnRegister.innerHTML = "Register a team";
    btnContainer.appendChild(btnRegister);

    let btnSpectate = document.createElement("button");
    btnSpectate.className = "btn";
    btnSpectate.innerHTML = "Spectate meet";
    btnContainer.appendChild(btnSpectate);

    btnRegister.onclick = (ev) => {
        let registration = new Registration();
        host.innerHTML = "";
        registration.drawForm(host);
    }

    btnSpectate.onclick = (ev) => {
        host.innerHTML = "";
        let c = new competition();
        c.drawCompetition(host);


    }
}