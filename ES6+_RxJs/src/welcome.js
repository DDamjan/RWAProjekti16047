import {Registration} from "./SwimmerRegistration";

export function drawWelcome(host){
    host.style.backgroundImage = 'url("../resources/welcome.jpg")';
    host.style.backgroundSize = "cover";
    host.style.backgroundColor = "#0c0129";
    host.style.backgroundBlendMode = "soft-light";

    let container = document.createElement("div");
    container.className = "welcome-div";
    host.appendChild(container);

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

    let btn = document.createElement("button");
    btn.className = "register-button";
    btn.innerHTML = "Register a team";
    container.appendChild(btn);

    btn.onclick = (ev) => {
        let registration = new Registration();
        host.innerHTML ="";
        registration.drawForm(host);
    }
}