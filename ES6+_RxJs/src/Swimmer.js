import { throws } from "assert";

export class swimmer {
    constructor(id, firstName, lastName, club, event, pb, exp, time) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.club = club;
        this.event = event;
        this.pb = pb;
        this.heat = 0;
        this.lane = 0;
        this.place = 0;
        this.time = time;
        this.exp = exp;
        this.rand = parseInt(Math.random() * 1000);
        this.changeDirection = false;
        this.half = false;
    }

    swim(time, event) {
        let lane = document.querySelectorAll('.lane-line')[this.lane];
        let laneContainer = document.querySelectorAll('.lane-container')[this.lane];
        let row = document.querySelector(`.lane${this.lane}`);

        if (this.time == 0) {
            lane.style.flexGrow = 0;
            let cTime = row.insertCell(5);
            cTime.innerHTML = "DSQ";
        }
        else if (time < this.time) {
            if (event.includes("50")) {
                laneContainer.style.flexDirection = "column-reverse";
                lane.style.flexGrow = time / this.time;
            }
            else if (event.includes("100")) {
                let split = this.time / 2;
                //50m
                if (time < split + this.rand && !this.changeDirection) {
                    laneContainer.style.flexDirection = "column-reverse";
                    lane.style.flexGrow = time / (split + this.rand);

                }
                else if (!this.changeDirection){
                    this.changeDirection = true;
                    lane.style.flexGrow = 0;
                    let cTime = row.insertCell(5);
                    cTime.innerHTML = Math.floor(parseInt(split + this.rand) / 6000) + ":" + Math.floor((parseInt(split + this.rand) / 100) % 60) + ":" + (parseInt(split + this.rand) % 100);
                }
                //100m
                if ((time - (split + this.rand)) < split - this.rand && this.changeDirection) {
                    laneContainer.style.flexDirection = "column";
                    lane.style.flexGrow = (time - (split + this.rand)) / (split - this.rand);
                }
            }
            else if (event.includes("200")) {
                let split = this.time / 4;
                //50m
                if (time < split + this.rand && !this.changeDirection && !this.half) {
                    laneContainer.style.flexDirection = "column-reverse";
                    lane.style.flexGrow = time / (split + this.rand);

                }
                else if (!this.changeDirection && !this.half){
                    this.changeDirection = true;
                    lane.style.flexGrow = 0;
                    let cTime = row.insertCell(5);
                    if (row.childElementCount==7){
                        row.deleteCell(6);
                    }
                    cTime.innerHTML = Math.floor(parseInt(split + this.rand) / 6000) + ":" + Math.floor((parseInt(split + this.rand) / 100) % 60) + ":" + (parseInt(split + this.rand) % 100);
                }
                //100m
                if ((time - (split + this.rand)) < split + this.rand && this.changeDirection && !this.half) {
                    laneContainer.style.flexDirection = "column";
                    lane.style.flexGrow = (time - (split + this.rand)) / (split + this.rand);
                }
                else if (this.changeDirection && !this.half){
                    this.half = true;
                    this.changeDirection = false;
                    lane.style.flexGrow = 0;
                    let cTime = row.insertCell(5);
                    if (row.childElementCount==7){
                        row.deleteCell(6);
                    }
                    cTime.innerHTML = Math.floor(parseInt(split + this.rand) / 6000) + ":" + Math.floor((parseInt(split + this.rand) / 100) % 60) + ":" + (parseInt(split + this.rand) % 100);
                }
                //150m
                if (time - ((split + this.rand)*2) < split - this.rand && !this.changeDirection && this.half) {
                    laneContainer.style.flexDirection = "column-reverse";
                    lane.style.flexGrow = (time- ((split + this.rand)*2)) / (split - this.rand);

                }
                else if (!this.changeDirection && this.half){
                    this.changeDirection = true;
                    lane.style.flexGrow = 0;
                    let cTime = row.insertCell(5);
                    if (row.childElementCount==7){
                        row.deleteCell(6);
                    }
                    cTime.innerHTML = Math.floor(parseInt(split - this.rand) / 6000) + ":" + Math.floor((parseInt(split - this.rand) / 100) % 60) + ":" + (parseInt(split - this.rand) % 100);
                }
                //200m
                if ((time - (((split + this.rand)*2)+(split-this.rand))) < split - this.rand && this.changeDirection && this.half) {
                    laneContainer.style.flexDirection = "column";
                    lane.style.flexGrow = (time - (((split + this.rand)*2)+(split-this.rand))) / (split - this.rand);
                }
            }
        }
        else {
            let cTime = row.insertCell(5);
            if (row.childElementCount==7){
                row.deleteCell(6);
            }
            cTime.innerHTML = Math.floor(this.time / 6000) + ":" + Math.floor((this.time / 100) % 60) + ":" + (this.time % 100);
        }
    }

    drawSwimmer(i) {
        let table = document.querySelectorAll('.competition-table')[i];
        let row = table.insertRow(2);
        row.className = "lane"+this.lane;
        let cHeat = row.insertCell(0);
        let cLane = row.insertCell(1);
        let cFirstName = row.insertCell(2);
        let cLastName = row.insertCell(3);
        let cClub = row.insertCell(4);

        cHeat.innerHTML = this.heat;
        cLane.innerHTML = this.lane + 1;
        cFirstName.innerHTML = this.firstName;
        cLastName.innerHTML = this.lastName;
        cClub.innerHTML = this.club;

        if (i === 2) {
            let cTime = row.insertCell(5);
            if (this.time === 0) {
                cTime.innerHTML = "DSQ";
            }
            else {
                cTime.innerHTML = Math.floor(this.time / 6000) + ":" + Math.floor((this.time / 100) % 60) + ":" + (this.time % 100);
            }
        }
    }
}