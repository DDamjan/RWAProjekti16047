export class swimmer{
    constructor(id, firstName, lastName, club, event, pb, exp){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.club = club;
        this.event = event;
        this.pb = pb;
        this.heat = 0;
        this.lane = 0;
        this.place = 0;
        this.time = 0;
        this.exp = exp; //odredjuje sansu za diskvalifikaciju. Veci broj -> manja sansa.
    }
}