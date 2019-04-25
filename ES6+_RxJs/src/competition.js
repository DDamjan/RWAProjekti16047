import { getFromDB } from "./db";
import { swimmer } from "./Swimmer";

export class competition{
    constructor(){
        this.swimmers = new Array();
        //this.populateSwimmers();
    }

    populateSwimmers(){
        getFromDB("Swimmers")
        .subscribe(res=>{
        getFromDB("swimmerCount")
            .subscribe(count=>{
                for (let i = 0; i< count.count; i++){
                    let s = res[i];
                    this.swimmers.push(s);
                }
            })
        });
    }
}