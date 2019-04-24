import { from } from "rxjs";

export function drawForm(host) {
    const formDiv = document.createElement("div");
    formDiv.className = "login-form";
    host.appendChild(formDiv);

    let label = document.createElement("label");
    label.innerHTML = "Swimmer registration";
    host.appendChild(label);

    drawContainer(formDiv, "First name", "first-name", "", false);
    drawContainer(formDiv, "Last name", "last-name", "", false);
    drawContainer(formDiv, "Club", "club", "", false);
    drawContainer(formDiv, "Select event", "event-selection", "", true);
    drawContainer(formDiv, "Event PB", "event-pb", "00:00:00 (min:sec:mili)", false);

    let btn = document.createElement("button");
    btn.innerHTML = "Add";
    host.appendChild(btn);

    btn.onclick = (ev) => {
        let firstName = document.querySelector('input[name="first-name"]').value;
        let lastName = document.querySelector('input[name="last-name"]').value;
        let club = document.querySelector('input[name="club"]').value;
        let event = document.querySelector('select[name="event-selection"]');
        let selectedEvent = event.options[event.selectedIndex].value;
        let eventPB = document.querySelector('input[name="event-pb"]').value;

        if (firstName === "" || lastName === "" || club === "") {
            alert("Please fill in all fields before submititng!")
        }
        else {
            sendSwimmerToDB(firstName, lastName, club, selectedEvent, eventPB);
        }


    }
}

function drawContainer(host, lblText, name, desc, bool) {
    const container = document.createElement("div");
    container.className = "login-component";
    host.appendChild(container);

    const label = document.createElement("label");
    label.innerHTML = lblText;
    container.appendChild(label);

    if (!bool) {
        const tbx = document.createElement("input");
        tbx.name = name;
        tbx.placeholder = desc;
        container.appendChild(tbx);
    }
    else {
        const dropDown = document.createElement("select");
        dropDown.name = name;
        container.appendChild(dropDown);


        returnFromDB("eventCount").subscribe(evCount => {
            for (let i = 1; i <= evCount.count; i++) {
                returnFromDB(`events/${i}`)
                    .subscribe(res => {
                        addEvent(dropDown, res.title, res.evID);
                    }
                    )
            }
        });
    }
}

function addEvent(host, event, evValue) {
    let ddOption = document.createElement("option");
    ddOption.innerHTML = event;
    ddOption.value = evValue;
    host.appendChild(ddOption);
}

function returnFromDB(table) {
    return from(
        fetch("http://localhost:3000/" + table)
            .then(res => res.json())
    )
}

function sendSwimmerToDB(firstName_, lastName_, club_, event_, PB_) {
    
    returnFromDB("swimmerCount").subscribe(res => {
        let id_ = res.count + 1;
        let data = {
            id : id_, 
            firstName : firstName_,
            lastName : lastName_,
            club : club_,
            event : event_,
            PB : PB_
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let newCount = {count :id_};
        let countOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCount)
        }
        postToDB(countOpt, "swimmerCount")
        postToDB(options, "swimmers");
        console.log("Poslato");
    });
}

function postToDB(options, table){
    return fetch("http://localhost:3000/"+table, options)
    .then((response) => response.json)
}