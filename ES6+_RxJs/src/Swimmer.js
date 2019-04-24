export class swimmer{
    constructor(id, firstName, lastName, club, event, pb){
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
        this.exp = 0; //odredjuje sansu za diskvalifikaciju. Veci broj -> manja sansa.
    }
}