import type { Event } from "@prisma/client";
import Service from "./Service.class";

export default class EventService extends Service<Event>{
    constructor(){
        super("event")
    }
}