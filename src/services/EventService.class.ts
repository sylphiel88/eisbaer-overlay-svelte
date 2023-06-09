import type { Event } from "@prisma/client";
import Service from "./Service.class";
import DBClient from "../db/prismaClient";


export default class EventService extends Service<Event>{
    constructor(){
        super("event")
    }
    
    public getAllByYearAndMonth = (year: number, month: number) => {
       let result = DBClient.getInstance().prisma.event.findMany({
        where:{
            month: month,
            year: year
        }
       })
       return result
    }

}