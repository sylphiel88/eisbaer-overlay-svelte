import type { Artist } from "@prisma/client";
import Service from "./Service.class";

export default class ArtistService extends Service<Artist>{
    constructor(){
        super("artist")
    }
}