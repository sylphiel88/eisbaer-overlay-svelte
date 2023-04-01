import type { Song } from "@prisma/client";
import Service from "./Service.class";

export default class SongService extends Service<Song>{
    constructor(){
        super("song")
    }
}