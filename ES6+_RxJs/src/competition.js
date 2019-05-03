import { populateSwimmers } from "./db";
import { createDiv } from "./functions";

export class competition {
    constructor() {
        this.swimmers = new Array();
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
        }

        createDiv(swimContainer, "heat-tables");
        let heatTablesDiv = document.querySelector(".heat-tables");
        
        createDiv(heatTablesDiv, "heat-table");
        createDiv(heatTablesDiv, "heat-table");
        createDiv(heatTablesDiv, "heat-table");

        let heatTables = document.querySelectorAll(".heat-table");
    }

    drawTables(host){}
}