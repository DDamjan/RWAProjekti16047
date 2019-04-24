import {Registration} from "./SwimmerRegistration";
import { getRandomNumbers } from "./logic";

let registration = new Registration();

registration.drawForm(document.body);

getRandomNumbers().subscribe(x=> console.log(x));
