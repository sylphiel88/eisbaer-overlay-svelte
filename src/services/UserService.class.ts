import type { User } from "@prisma/client";
import Service from "./Service.class";

export default class UserService extends Service<User>{
    constructor(){
        super("user")
    }
}