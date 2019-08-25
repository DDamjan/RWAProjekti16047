/* GENERAL */
const REPO_PATH = `D:\\Faks\\RWAProjekti16047\\rwaserver\\repo\\`;
function CURRENT_ID(table) {
    return `SELECT IDENT_CURRENT('${table}') as ID`;
}

/* DRIVERS */
const GET_DRIVERS = 'select * from driver';
const GET_DRIVER = 'select * from driver where ID = ';
function DELETE_DRIVER(ID) {
    return `delete from rides where driverID = ${ID};
           delete from driver where ID = ${ID}`;
}


function ADD_DRIVER(firstName, lastName, phone, car, color, licencePlate, currentLat, currentLng, currentLocation) {
    return `insert into driver (firstName, lastName, phone, car, color, licencePlate, currentLat, currentLng, currentLocation, isActive) 
            values ('${firstName}', '${lastName}', ${phone}, '${car}', '${color}', '${licencePlate}', ${currentLat}, ${currentLng}, '${currentLocation}', 0)`;
}

function UPDATE_DRIVER(pickupLat, pickupLng, pickupLocation, ID) {
    return `update driver set pickupLat = ${pickupLat}, pickupLng = ${pickupLng}, pickupLocation = '${pickupLocation}' where ID = ${ID}`
}

/* RIDES */
const GET_RIDES = `select ID, driverID, startLat, startLng, destinationLat, destinationLng, startLocation, destinationLocation, Convert(varchar, startTime, 120) as startTime, Convert(varchar, endTime, 120) as endTime, isCanceled, fare, distance from rides where driverID = `;
function ADD_RIDE(startLat, startLng, startLocation, destLat, destLng, destinationLocation, driverID) {
    return `update driver set isActive = 1 where ID = ${driverID}; 
            insert into rides (driverID, startLat, startLng, destinationLat, destinationLng, startLocation, destinationLocation, isCanceled) 
            values (${driverID}, ${startLat}, ${startLng}, ${destLat}, ${destLng}, '${startLocation}', '${destinationLocation}', 0)`;
}

function FINISH_RIDE(ID, driverID, endTime, destinationLat, destLng, destinationLocation) {
    return `update driver set isActive = 0, currentLat = ${destinationLat}, currentLng = ${destLng}, currentLocation = '${destinationLocation}' where ID = ${driverID};
            update rides set endTime = Convert(datetime, '${endTime}', 120), isCanceled = 0 where ID = ${ID}`;
}

function CANCEL_RIDE(ID, driverID, endTime) {
    return `update driver set isActive = 0 where ID = ${driverID};
            update rides set endTime = Convert(datetime, '${endTime}', 120), isCanceled = 1 where ID = ${ID}`;
}

function ADD_DISTANCE_FARE(distance, fare, ID) {
    return `update rides set fare = ${fare}, distance = '${distance}' where ID = (select ID from rides where endTime is null and isCanceled = 0 and driverID = ${ID})`;
}

/* Users */
const GET_USER_BY_ID = 'Select ID, Username from reduxedUsers where ID = ';
function AUTH_USER(username, password) {
    return `Select ID, Username from reduxedUsers where Username = '${username}' and Password = '${password}'`;
}
function REGISTER_USER(Username, Password) {
    return `insert into reduxedUsers (Username, Password) values ('${Username}', '${Password}'); Select ID, Username from reduxedUsers where Username like '${Username}'`;
}
function CHECK_USERNAME(Username) {
    return `Select Username from reduxedUsers where Username = '${Username}'`;
}


/* Playlists */

const GET_PLAYLISTS = 'Select * from reduxedPlaylist where ownerID = ';
function ADD_PLAYLIST(name, ownerID) {
    return `Insert into reduxedPlaylist (name, ownerID) values ('${name}', ${ownerID})`;
}

module.exports = {
    ADD_DRIVER: ADD_DRIVER,
    GET_DRIVERS: GET_DRIVERS,
    ADD_RIDE: ADD_RIDE,
    DELETE_DRIVER: DELETE_DRIVER,
    GET_DRIVER: GET_DRIVER,
    CURRENT_ID: CURRENT_ID,
    REPO_PATH, REPO_PATH,
    FINISH_RIDE: FINISH_RIDE,
    GET_RIDES: GET_RIDES,
    ADD_DISTANCE_FARE: ADD_DISTANCE_FARE,
    CANCEL_RIDE: CANCEL_RIDE,
    UPDATE_DRIVER: UPDATE_DRIVER,
    AUTH_USER: AUTH_USER,
    REGISTER_USER: REGISTER_USER,
    GET_USER_BY_ID: GET_USER_BY_ID,
    CHECK_USERNAME: CHECK_USERNAME,
    GET_PLAYLISTS: GET_PLAYLISTS,
    ADD_PLAYLIST: ADD_PLAYLIST

}