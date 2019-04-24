import { from } from "rxjs";
import { returnFromDB, sendSwimmerToDB, postToDB } from "./db.js"
import { swimmer } from "./Swimmer.js";

export class Registration {

    constructor() {
        this.swimmers = new Array();
    }

    drawForm(host) {
        const formDiv = document.createElement("div");
        formDiv.className = "login-form";
        host.appendChild(formDiv);

        let label = document.createElement("label");
        label.innerHTML = "Swimmer registration";
        host.appendChild(label);

        this.drawContainer(formDiv, "First name", "first-name", "", false);
        this.drawContainer(formDiv, "Last name", "last-name", "", false);
        this.drawContainer(formDiv, "Club", "club", "", false);
        this.drawContainer(formDiv, "Select event", "event-selection", "", true);
        this.drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

        this.drawButtons(host);
    }

    drawContainer(host, lblText, name, desc, bool) {
        const container = document.createElement("div");
        container.className = "login-component";
        host.appendChild(container);

        const label = document.createElement("label");
        label.innerHTML = lblText;
        container.appendChild(label);

        if (!bool) {
            const tbx = document.createElement("input");
            tbx.name = name;
            tbx.placeholder = desc;
            container.appendChild(tbx);
        }
        else {
            const dropDown = document.createElement("select");
            dropDown.name = name;
            container.appendChild(dropDown);


            returnFromDB("eventCount").subscribe(evCount => {
                for (let i = 1; i <= evCount.count; i++) {
                    returnFromDB(`events/${i}`)
                        .subscribe(res => {
                            this.addEvent(dropDown, res.title, res.evID);
                        })
                }
            });
        }
    }

    addEvent(host, event, evValue) {
        let ddOption = document.createElement("option");
        ddOption.innerHTML = event;
        ddOption.value = evValue;
        host.appendChild(ddOption);
    }

    drawButtons(host) {
        const container = document.createElement("div");
        container.className = "login-component";
        host.appendChild(container);

        const btnAdd = document.createElement("button");
        btnAdd.innerHTML = "Add";
        container.appendChild(btnAdd);

        btnAdd.onclick = (ev) => {
            let firstName = document.querySelector('input[name="first-name"]').value;
            let lastName = document.querySelector('input[name="last-name"]').value;
            let club = document.querySelector('input[name="club"]').value;
            let event = document.querySelector('select[name="event-selection"]');
            let selectedEvent = event.options[event.selectedIndex].value;
            let eventPB = document.querySelector('input[name="event-pb"]').value;

            if (firstName === "" || lastName === "" || club === "") {
                alert("Please fill in all fields before submititng!");
            }
            else {
                returnFromDB("swimmerCount")
                    .subscribe(res => {
                        let id = res.count + 1;
                        let s = new swimmer(id, firstName, lastName, club, selectedEvent, eventPB);
                        this.swimmers.push(s);
                        
                        let sCount = {count:id};
                        postToDB(sCount, "swimmerCount");
                    });
            }
        }

        const btnSubmit = document.createElement("button");
        btnSubmit.innerHTML = "Submit";
        container.appendChild(btnSubmit);

        btnSubmit.onclick = (ev) => {
            postToDB(this.swimmers, "Swimmers");
        }
    }
}
