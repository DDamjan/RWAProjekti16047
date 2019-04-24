import { from } from "rxjs";

export function returnFromDB(table) {
    return from(
        fetch("http://localhost:3000/" + table)
            .then(res => res.json())
    )
}

export function sendSwimmerToDB(swimmerArray) {
    swimmerArray.forEach(s => {
        let body = s;
        postToDB(body, "Swimmers");
    });
}

export function postToDB(body, table) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch("http://localhost:3000/" + table, options)
        .then((response) => response.json)
}