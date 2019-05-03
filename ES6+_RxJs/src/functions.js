import { interval, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { createDecipheriv } from "crypto";

export function reformatTime(time) {
    let x = time.slice(0, 2);
    let i = 3; 
    while (i < 7) {
        x+=time.slice(i, i+2);
        i+=3;
    }
    let minute = parseInt(x/10000);
    let second = parseInt((x/100)%100);
    let milisecond = parseInt(x%100);

    return ( (minute*60000)+(second*1000)+(milisecond));
}

export function createDiv(host, className){
    let newDiv = document.createElement("div");
        newDiv.className = className;
        host.appendChild(newDiv);
}