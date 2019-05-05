import { populateSwimmers } from "./db";
import { createDiv, drawTables, drawTime } from "./functions";

export class competition {
    constructor() {
        this.swimmers = new Array();
        this.previousHeat = new Array();
        this.currentHeat = new Array();
        this.nextHeat = new Array();
        populateSwimmers(this.swimmers);
        
    }

    drawCompetition(host) {
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

        drawTime(timeDiv);

        createDiv(timeKeepingDiv, "heat-tables");
        let heatTablesDiv = document.querySelector(".heat-tables");

        createDiv(heatTablesDiv, "heat-table");
        createDiv(heatTablesDiv, "heat-table");
        createDiv(heatTablesDiv, "heat-table");

        let heatTables = document.querySelectorAll(".heat-table");
        let tableNames = ["Current Heat", "Next Heat", "Previous Heat"];
        drawTables(heatTables, tableNames);

        /*sortIntoHeat(this.swimmers, this.currentHeat);
        sortIntoHeat(this.swimmers, this.nextHeat);*/



    }
}