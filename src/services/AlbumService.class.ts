import type { Album } from "@prisma/client";
import Service from "./Service.class";

export default class AlbumService extends Service<Album>{
    constructor(){
        super("album")
    }
}