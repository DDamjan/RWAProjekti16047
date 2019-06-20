import { interval, from, fromEventPattern } from "rxjs";
import { filter, take, skip, groupBy, mergeMap, toArray, skipWhile, takeWhile } from "rxjs/operators";
import { getFromDB, populateSwimmers, postToDB, updateDB } from "./db";
import Swimmer from './Swimmer';

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

    return ((minute * 6000) + (second * 100) + (milisecond));
}

export function randomDSQ(time, exp) {
    let val = Math.random() * 100;
    console.log(`val: ${val}, exp: ${exp}`)
    if (val < exp) {
        return time;
    }
    else {
        return 0;
    }
}

export function createDiv(host, className) {
    let newDiv = document.createElement("div");
    newDiv.className = className;
    host.appendChild(newDiv);
}

export async function sortIntoHeat(event) {
    let heats = await populateSwimmers(event);
    let sortedHeat = new Array();
    let heatsList = new Array();
    let finalList = new Array();

    heats.sort((a, b) => a.pb - b.pb);
    let i = 0;

    while (i <= Math.ceil(heats.length / 8)) {
        from(heats).pipe(
            skip(i * 8),
            take(8)
        ).subscribe(swimmer => {
            swimmer.heat = i + 1;
            sortedHeat.push(swimmer)
        });
        i++;
    }
    console.log(sortedHeat);

    from(sortedHeat).pipe(
        groupBy(swimmer => swimmer.heat),
        mergeMap(heat => heat.pipe(toArray()))
    ).subscribe(x => {
        x.sort((a, b) => a.pb - b.pb);
        heatsList.push(x)
    });

    heatsList.forEach(heat => {
        let i = 0;
        heat.forEach(swimmer => {
            switch (i) {
                case 0: swimmer.lane = 3;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 1: swimmer.lane = 4;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 2: swimmer.lane = 2;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 3: swimmer.lane = 5;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 4: swimmer.lane = 1;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 5: swimmer.lane = 6;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 6: swimmer.lane = 0;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                case 7: swimmer.lane = 7;
                    updateDB(swimmer, `Swimmers/${swimmer.id}`);
                    break;
                default:
                    break;
            }
            i++;
        })
    })
    heatsList.forEach(heat => {
        heat.sort((a, b) => b.lane - a.lane);
        finalList.push(heat);
    })
    return finalList;
}


export function stopWatchStart() {
    return interval(10 /* ms */);
}

export async function extractEvent(swimArray, eventID) {
    let eventArray = new Array();
    let arr = from(swimArray);
    eventArray = arr.pipe(filter(x => x.event === eventID));
    return eventArray;
}

export function addEvent(host, event, evValue) {
    let ddOption = document.createElement("option");
    ddOption.innerHTML = event;
    ddOption.value = evValue;
    host.appendChild(ddOption);
}

export async function startCompetition(currentHeat, previousHeat, nextHeat, btnContinue, event) {
    btnContinue.disabled = true;
    let finished = 0;
    let stopwatch = document.querySelector('.stopwatch-label');
    let isFinished = new Array(currentHeat.length);
    isFinished.fill(false);
    fillTable(currentHeat, previousHeat, nextHeat);
    let Ostopwatch = await stopWatchStart().subscribe(async time => {
        if (finished != currentHeat.length) {
            stopwatch.innerHTML = Math.floor(time / 6000) + ":" + Math.floor((time / 100) % 60) + ":" + (time % 100);
            await currentHeat.forEach(swimmer => {
                if (time <= swimmer.time) {
                    swimmer.swim(time, event);
                }
                else {
                    if (!isFinished[swimmer.lane]) {
                        finished++;
                        isFinished[swimmer.lane] = true;
                        if (finished == currentHeat.length) {
                            resetStopwatch();
                            btnContinue.disabled = false;
                            Ostopwatch.unsubscribe();
                        }
                    }
                }
            })
        }
    });
}

function fillTable(currentHeat, previousHeat, nextHeat) {
    currentHeat.forEach(swimmer => {
        swimmer.drawSwimmer(0);
    });

    for (let i = nextHeat.length - 1; i >= 0; i--) {
        nextHeat[i].forEach(swimmer => {
            swimmer.drawSwimmer(1);
        })
    }

    for (let i = previousHeat.length - 1; i >= 0; i--) {
        previousHeat[i].forEach(swimmer => {
            swimmer.drawSwimmer(2);
        })
    }
}

export async function resetStopwatch() {
    let stopwatch = document.querySelector('.stopwatch-label');
    stopwatch.innerHTML = "00:00:00";
    let btn = document.querySelectorAll('.btn')[1];
    btn.disabled = false;
}

export function prepareHeat() {
    let lane = document.querySelectorAll('.lane-line');
    lane.forEach(x => x.style.flexGrow = 0);

    let table = document.querySelectorAll('.competition-table');
    table.forEach(x => {
        let len = x.rows.length;
        for (let i = 2; i < len; i++) {
            x.deleteRow(2);
        }
    })


}
export function showResults(event) {
    let table = document.querySelector('.results-table');
    let preSort = new Array();
    let sorted = new Array();

    event.forEach(heat => {
        from(heat).subscribe(swimmer => preSort.push(swimmer));
    });

    preSort.sort((a, b) => a.time - b.time);
    from(preSort).pipe(
        skipWhile(x => x.time === 0)
    ).subscribe(x => sorted.push(x));

    from(preSort).pipe(
        takeWhile(x => x.time === 0)
    ).subscribe(x => sorted.push(x));

    if (sorted.length === 1) {
        sorted[0].place = 1;
    }

    let i = 0;
    let j;
    while (i < sorted.length - 1) {
        j = i + 1;
        while ( j < sorted.length && sorted[i].time === sorted[j].time) {
            if (j < sorted.length) {
                sorted[j].place = i + 1;
                j++;
            }
        }
        sorted[i].place = i + 1;
        i = j;
    }
    for (let i = sorted.length - 1; i >= 0; i--) {
        let row = table.insertRow(2);
        let cPlace = row.insertCell(0);
        let cFirstName = row.insertCell(1);
        let cLastName = row.insertCell(2);
        let cClub = row.insertCell(3);
        let cTime = row.insertCell(4);

        cPlace.innerHTML = sorted[i].place;
        cFirstName.innerHTML = sorted[i].firstName;
        cLastName.innerHTML = sorted[i].lastName;
        cClub.innerHTML = sorted[i].club;
        if (sorted[i].time == 0) {
            cTime.innerHTML = "DSQ";
        }
        else {
            cTime.innerHTML = Math.floor(sorted[i].time / 6000) + ":" + Math.floor((sorted[i].time / 100) % 60) + ":" + (sorted[i].time % 100);
        }
    }
}
