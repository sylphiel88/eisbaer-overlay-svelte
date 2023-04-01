import type { EventType } from "@prisma/client";
import Service from "./Service.class";

export default class EventTypeService extends Service<EventType>{
    constructor(){
        super("eventType")
    }
}