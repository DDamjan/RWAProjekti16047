import { createDiv, sortIntoHeat, addEvent, startCompetition, showResults, prepareHeat } from "./functions";
import { getFromDB } from "./db";

export class competition {
    constructor() {
        this.previousHeat = new Array();
        this.currentHeat = new Array();
        this.nextHeat = new Array();
        this.event = new Array();
        this.results = false;
        this.newEvent = false;

    }

    async drawCompetition(host) {
        createDiv(host, "competition-container");
        let container = document.querySelector(".competition-container");

        createDiv(container, "competition-heats");
        createDiv(container, "swim-container");
        let swimContainer = document.querySelector(".swim-container");
        createDiv(swimContainer, "pool-container");
        let divPool = document.querySelector(".pool-container");

        createDiv(divPool, "pool-lanes");
        createDiv(divPool, "pool-lane-number");
        let poolLanesDiv = document.querySelector(".pool-lanes");
        for (let i = 0; i < 8; i++) {
            createDiv(poolLanesDiv, "lane-container");
            let lane = document.querySelectorAll(".lane-container");
            createDiv(lane[i], "lane-line");
        }

        createDiv(swimContainer, "time-keeping");
        let timeKeepingDiv = document.querySelector(".time-keeping");

        createDiv(timeKeepingDiv, "time-div");
        let timeDiv = document.querySelector(".time-div");

        createDiv(timeKeepingDiv, "heat-tables");
        let heatTablesDiv = document.querySelector(".heat-tables");

        this.drawTime(timeDiv);
        this.drawTables(heatTablesDiv);


    }

    drawTables(host) {
        host.innerHTML = "";

        createDiv(host, "heat-table");
        createDiv(host, "heat-table");
        createDiv(host, "heat-table");

        let heatTables = document.querySelectorAll(".heat-table");
        let tableNames = ["Current Heat", "Next Heats", "Previous Heats"];

        for (let i = 0; i < 3; i++) {

            let table = document.createElement("table");
            table.className = "competition-table";
            table.innerHTML = `<tr>
                                <td>${tableNames[i]}</td>
                               </tr>
                               <tr>
                                <td>Heat</td>
                                <td>Lane</td>
                                <td>First name</td>
                                <td>Last name</td>
                                <td>Club</td>
                                <td>Time</td>
                               <tr>`;
            heatTables[i].appendChild(table);
        }
    }

    drawResults(host) {
        host.innerHTML = "";

        let table = document.createElement("table");
        table.className = "results-table";
        table.innerHTML = `<tr>
                            <td>Results</td>
                            </tr>
                            <tr>
                                <td>Place</td>
                                <td>First name</td>
                                <td>Last name</td>
                                <td>Club</td>
                                <td>Time</td>
                            <tr>`;
        host.appendChild(table);

    }

    drawTime(host) {
        let btnStart = document.createElement("button");
        btnStart.innerHTML = "Start";
        btnStart.className = "btn";
        host.appendChild(btnStart);

        let btnContinue = document.createElement('button');
        btnContinue.innerHTML = "Next heat";
        btnContinue.className = "btn";
        host.appendChild(btnContinue);
        btnContinue.disabled = true;

        const dropDown = document.createElement("select");
        dropDown.name = "event-selector";
        dropDown.className = "event-selector";
        host.appendChild(dropDown);


        getFromDB("eventCount")
            .subscribe(evCount => {
                for (let i = 1; i <= evCount.count; i++) {
                    getFromDB(`events/${i}`)
                        .subscribe(res => {
                            addEvent(dropDown, res.title, res.evID);
                        })
                }
            });

        let stopwatch = document.createElement("label");
        stopwatch.className = "stopwatch-label";
        stopwatch.innerHTML = "00:00:00";
        host.appendChild(stopwatch);

        btnStart.onclick = async (ev) => {
            if (this.newEvent) {
                this.newEvent = false;

                let tablesContainer = document.querySelector(".heat-tables");
                this.drawTables(tablesContainer);
            }
            prepareHeat();
            let eventSelector = document.querySelector('select[name="event-selector"]');
            let selectedEvent = eventSelector.options[eventSelector.selectedIndex];
            this.event.length = 0;
            this.event = await sortIntoHeat(selectedEvent.value);
            this.currentHeat = this.event[0];
            for (let i = 1; i < this.event.length; i++) {
                this.nextHeat.push(this.event[i]);
            }
            if (this.nextHeat.length === 0) {
                btnContinue.innerHTML = "See results";
                this.results = true;
            }
            startCompetition(this.currentHeat, this.previousHeat, this.nextHeat, btnContinue, selectedEvent.value);
            btnStart.disabled = true;
        }
        btnContinue.onclick = (ev) => {

            if (!this.results) {
                this.previousHeat.push(this.currentHeat);
                this.currentHeat = this.nextHeat[0];
                this.nextHeat.shift();
                prepareHeat();
                if (this.nextHeat.length === 0) {
                    btnContinue.innerHTML = "See results";
                    this.results = true;
                }
                let eventSelector = document.querySelector('select[name="event-selector"]');
                let selectedEvent = eventSelector.options[eventSelector.selectedIndex];
                startCompetition(this.currentHeat, this.previousHeat, this.nextHeat, btnContinue, selectedEvent.value);
            }
            else {
                let tables = document.querySelector('.heat-tables');
                this.drawResults(tables);
                btnStart.disabled = false;
                this.newEvent = true;
                btnContinue.disabled = true;
                btnContinue.innerHTML = "Next heat";
                showResults(this.event);
                this.currentHeat.length = 0;
                this.previousHeat.length = 0;
                this.nextHeat.length = 0;
                this.results = false;
            }
        }
    }
}