import { from } from "rxjs";

export function getFromDB(table) {
    return from(
        fetch("http://localhost:3000/" + table)
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

    return fetch("http://localhost:3000/" + table, options)
        .then((response) => response.json)
}

export function populateSwimmers(swimmers) {
    getFromDB("Swimmers")
        .subscribe(res => {
            if (res.count != 0) {
                getFromDB("swimmerCount")
                    .subscribe(count => {
                        for (let i = 0; i < count.count; i++) {
                            let s = res[i];
                            swimmers.push(s);
                        }
                    })
            }
        });
}