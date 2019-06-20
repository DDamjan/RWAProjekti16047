import { getFromDB, postToDB, putToDB } from "./db"
import { swimmer } from "./Swimmer";
import { reformatTime, createDiv, addEvent, randomDSQ } from "./functions";
import { competition } from "./competition";


export class Registration {

    constructor() {
        this.swimmers = new Array();
        this.time = 0;
        this.count = 0;
        getFromDB("SwimmerCount").subscribe(res => {
            this.count = res.count;
        })
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
                                addEvent(dropDown, res.title, res.evID);
                            })
                    }
                });
        }
    }

    drawButtons(host) {
        createDiv(host, "register-buttons");
        const container = document.querySelector(".register-buttons");

        const btnAdd = document.createElement("button");
        btnAdd.innerHTML = "Add";
        btnAdd.className = "btn";
        container.appendChild(btnAdd);

        btnAdd.onclick =(ev) => {
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
                let id = this.count + 1;
                this.count++;
                //Odredjuje sansu za diskvalifikaciju. Veci broj -> manja sansa.
                let exp = parseInt(Math.random() * 150);
                let pb = reformatTime(eventPB.value);
                console.log(eventPB.value);
                console.log(pb);

                /*Isplivano vreme je random vreme izmedju vremena 2 seknude brzeg od svetskog rekorda i vremena 5 sekundi sporijeg od najboljeg isplivanog vremena plivaca.
                Izrazeno u milisekundama*/
                getFromDB(`records?evID=${selectedEvent.value}`)
                    .subscribe(record => {
                        //Diskvalifikacija se u bazi pamti kao 0 a ispisuje se kao DSQ.
                        let time = randomDSQ(parseInt(Math.random() * (pb + 5000 - (record[0].time - 2000)) + (record[0].time - 2000)), exp);
                        console.log(`exp: ${exp}, time: ${time}`);
                        let s = new swimmer(id, firstName.value, lastName.value, club.value, selectedEvent.value, pb, exp, time);
                        this.swimmers.push(s);
                        firstName.value = "";
                        lastName.value = "";
                        club.value = "";
                        eventPB.value = "";
                    });
            }
        }

        const btnSubmit = document.createElement("button");
        btnSubmit.innerHTML = "Submit";
        btnSubmit.className = "btn";
        container.appendChild(btnSubmit);

        btnSubmit.onclick = (ev) => {
            if (this.swimmers.length != 0) {
                postToDB(this.swimmers, "Swimmers");
                let sCount = { count: this.count };
                postToDB(sCount, "swimmerCount");
            }
            else {
                alert("No swimmers registered! At least one swimmer needs to be registered!");
            }

        }
    }
}
