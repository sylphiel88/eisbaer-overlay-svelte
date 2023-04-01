import type { DJ } from "@prisma/client";
import Service from "./Service.class";

export default class DJService extends Service<DJ>{
    constructor(){
        super("dJ")
    }
}