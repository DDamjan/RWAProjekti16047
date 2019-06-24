import { Action } from '@ngrx/store';
import { ADD_DRIVER, CHANGE_STATUS, SELECT_DRIVER, SELECT_ALL_DRIVERS, GIVE_ADRESS, DELETE_DRIVER } from 'src/constants/reducers-constants';
import { Driver } from '../models/driver';

export class AddDriver implements Action {
    type = ADD_DRIVER;
    driver: Driver;
    constructor(driver: Driver) {
        this.driver = { ...driver };
    }
}

export class UpdateDriver implements Action {
    type = CHANGE_STATUS;
    driver: Driver;
    constructor(driver: Driver) {
        this.driver = { ...driver };
    }
}

export class SelectDriver implements Action {
    type = SELECT_DRIVER;
    constructor(public driver: Driver) { }
}

export class SelectAllDrivers implements Action {
    type = SELECT_ALL_DRIVERS;
    constructor(public drivers: Driver[]) { }
}

export class GiveAdress implements Action {
    type = GIVE_ADRESS;
    constructor(public driver: Driver) {
        this.driver = { ...driver };
    }
}

export class DeleteDriver implements Action {
    type = DELETE_DRIVER;
    constructor(public driver: Driver) { }
}