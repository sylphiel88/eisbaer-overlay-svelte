import type { View } from "@prisma/client";
import Service from "./Service.class";

export default class ViewService extends Service<View>{
    constructor(){
        super("view")
    }
}