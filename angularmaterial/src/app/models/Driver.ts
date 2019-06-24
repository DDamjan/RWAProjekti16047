export class Driver {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public phone: number,
        public car: string,
        public color: string,
        public licencePlate: string,
        public currentLat: number,
        public currentLng: number,
        public destinationLat: number,
        public destinationLng: number,
        public isActive: boolean
    ) {

    }

}
