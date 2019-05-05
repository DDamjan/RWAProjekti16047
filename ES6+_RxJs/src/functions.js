import { interval } from "rxjs";

export function reformatTime(time) {
    let x = time.slice(0, 2);
    let i = 3;
    while (i < 7) {
        x += time.slice(i, i + 2);
        i += 3;
    }
    let minute = parseInt(x / 10000);
    let second = parseInt((x / 100) % 100);
    let milisecond = parseInt(x % 100);

    return ((minute * 60000) + (second * 1000) + (milisecond));
}

export function createDiv(host, className) {
    let newDiv = document.createElement("div");
    newDiv.className = className;
    host.appendChild(newDiv);
}

export function drawTables(host, name) {
    for (let i = 0; i < 3; i++) {
        let table = document.createElement("table");
        table.className = "competition-table";
        table.innerHTML = `<tr>
                            <td>${name[i]}</td>
                           </tr>
                           <tr>
                            <td>Lane</td>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Club</td>
                            <td>Time</td>
                           <tr>`;
        host[i].appendChild(table);
    }
}

export function drawTime(host) {
    let btnStart = document.createElement("button");
    btnStart.innerHTML = "Start";
    btnStart.className = "btn-start";
    host.appendChild(btnStart);

    let stopwatch = document.createElement("label");
    stopwatch.className = "stopwatch-label";
    stopwatch.innerHTML = "00:00:00";
    host.appendChild(stopwatch);

    btnStart.onclick = (ev) => {
        stopWatchStart(stopwatch);
        btnStart.disabled = true;
    }
}

export function sortSwimmers(swimmers) {

}

export function sortIntoHeat(swimmers, heat) {

}


export function stopWatchStart(host) {
    interval(10 /* ms */)
        .subscribe(time => {
            host.innerHTML = Math.floor(time / 6000) + ":" + Math.floor((time / 100) % 60) + ":" + (time % 100);
        });

}
