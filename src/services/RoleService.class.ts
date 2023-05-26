import type { Roles } from "@prisma/client";
import Service from "./Service.class";

export default class RoleService extends Service<Roles>{
    constructor(){
        super("roles")
    }
}