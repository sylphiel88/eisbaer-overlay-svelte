import type { SongOnEvent } from "@prisma/client";
import Service from "./Service.class";

export default class SongOnEventService extends Service<SongOnEvent>{
    constructor(){
        super("song")
    }
}