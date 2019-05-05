import { getFromDB, postToDB, populateSwimmers } from "./db"
import { swimmer } from "./Swimmer";
import { reformatTime, createDiv } from "./functions";
import { competition } from "./competition";


export class Registration {

    constructor() {
        this.swimmers = new Array();

        populateSwimmers(this.swimmers);
    }

    drawForm(host) {
        createDiv(host, "register-form");
        let formDiv = document.querySelector(".register-form");

        let label = document.createElement("label");
        label.className = "registration-label";
        label.innerHTML = "Swimmer registration";
        formDiv.appendChild(label);

        this.drawContainer(formDiv, "First name", "first-name", "", false);
        this.drawContainer(formDiv, "Last name", "last-name", "", false);
        this.drawContainer(formDiv, "Club", "club", "", false);
        this.drawContainer(formDiv, "Select event", "event-selection", "", true);
        this.drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

        let Cleave = require('cleave.js');
        let c = new Cleave('.register-input-pb', {
            time: true,
            timePattern: ['h', 'm', 's']
        });

        this.drawButtons(formDiv);

        createDiv(formDiv, "register-component");
        let toCompetitionDiv = document.querySelectorAll('.register-component');

        let btnCompetition = document.createElement("button");
        btnCompetition.className = "btn-competition";
        btnCompetition.innerHTML = "Proceed to competition";
        toCompetitionDiv[5].appendChild(btnCompetition);

        btnCompetition.onclick = (ev) => {
            host.innerHTML = "";
            let c = new competition();
            c.drawCompetition(host);
        }
    }

    drawContainer(host, lblText, name, desc, bool) {
        const container = document.createElement("div");
        container.className = "register-component";
        host.appendChild(container);

        const label = document.createElement("label");
        label.innerHTML = lblText;
        label.className = "reg-component-label";
        container.appendChild(label);

        if (!bool) {
            if (name != "event-pb") {
                const tbx = document.createElement("input");
                tbx.name = name;
                tbx.className = "register-input";
                tbx.placeholder = desc;
                container.appendChild(tbx);
            }
            else {
                const tbx = document.createElement("input");
                tbx.name = name;
                tbx.className = "register-input-pb";
                tbx.placeholder = desc;
                container.appendChild(tbx);
            }

        }
        else {
            const dropDown = document.createElement("select");
            dropDown.name = name;
            dropDown.className = "register-input";
            container.appendChild(dropDown);


            getFromDB("eventCount")
                .subscribe(evCount => {
                    for (let i = 1; i <= evCount.count; i++) {
                        getFromDB(`events/${i}`)
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
        createDiv(host, "register-buttons");
        const container = document.querySelector(".register-buttons");

        const btnAdd = document.createElement("button");
        btnAdd.innerHTML = "Add";
        btnAdd.className = "btn-add";
        container.appendChild(btnAdd);

        btnAdd.onclick = (ev) => {
            let firstName = document.querySelector('input[name="first-name"]');
            let lastName = document.querySelector('input[name="last-name"]');
            let club = document.querySelector('input[name="club"]');
            let event = document.querySelector('select[name="event-selection"]');
            let selectedEvent = event.options[event.selectedIndex];
            let eventPB = document.querySelector('input[name="event-pb"]');

            if (firstName.value === "" || lastName.value === "" || club.value === "") {
                alert("Please fill in all fields before adding!");
            }
            else {
                getFromDB("swimmerCount")
                    .subscribe(res => {
                        let id = res.count + 1;
                        let exp = parseInt(Math.random() * 100);

                        let pb = reformatTime(eventPB.value);
                        let s = new swimmer(id, firstName.value, lastName.value, club.value, selectedEvent.value, pb, exp);
                        this.swimmers.push(s);
                        let sCount = { count: id };
                        postToDB(sCount, "swimmerCount");
                        firstName.value = "";
                        lastName.value = "";
                        club.value = "";
                        eventPB.value = "";
                    });
            }
        }

        const btnSubmit = document.createElement("button");
        btnSubmit.innerHTML = "Submit";
        btnSubmit.className = "btn-submit";
        container.appendChild(btnSubmit);

        btnSubmit.onclick = (ev) => {
            getFromDB("swimmerCount")
                .subscribe(res => {
                    if (this.swimmers.length != 0) {
                        postToDB(this.swimmers, "Swimmers");
                    }
                    else {
                        alert("No swimmers registered! At least one swimmer needs to be registered!");
                    }

                })

        }
    }
}
