import { from } from "rxjs";
import { async } from "rxjs/internal/scheduler/async";
import { swimmer } from "./Swimmer";

const dbadress = 'http://localhost:3000/';

export function getFromDB(table) {
    return from(
        fetch(dbadress + table)
            .then(res => res.json())
    )
}

export function postToDB(body, table) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch(dbadress + table, options)
        .then((response) => response.json)
}
export function updateDB(body, table) {
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return fetch(dbadress + table, options)
        .then((response) => response.json)
}

export function populateSwimmers(event) {
    return new Promise(resolve => {
        getFromDB("Swimmers?event=" + event)
            .subscribe(res => {
                let swimmers = new Array();
                for (let i = 0; i < res.length; i++) {
                    let s = new swimmer(res[i].id, res[i].firstName, res[i].lastName, res[i].club, res[i].event, res[i].pb, res[i].exp, res[i].time);
                    swimmers.push(s);
                }
                resolve(swimmers);
            })
    })
}