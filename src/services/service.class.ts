import { Prisma, type Album, type Artist, type User } from "@prisma/client";
import DBClient from "../db/prismaClient";
import type { GenericModel, ModelName, Models, ModelTypes } from "../types/types";

export default class Service<T extends ModelTypes> {


    private static prisma = DBClient.getInstance().prisma
    
    #model: GenericModel
    #idName: String|undefined

    #getModel<SpecificModelName extends Models>(
        modelName: SpecificModelName,
    ): GenericModel {
        return Service.prisma[modelName] as GenericModel;
    }

    constructor (modelName: Models){
        this.#model = this.#getModel(modelName)
        this.#idName = Prisma.dmmf.datamodel.models.find(model=>{
            let firstLetter = (modelName as string)[0]
            firstLetter = firstLetter.toUpperCase()
            let mName = firstLetter + modelName.slice(1)
            return mName === model.name                        
        })?.fields.find(field=>field.isId)?.name
    }

    public create({...args}:T) {
        //@ts-ignore
        this.#model.create({data:{
            ...args
        }})
    }

    public readAll() {
        return this.#model.findMany({})    
    }

    public readOne(id: number) {
        let currWhere:{[key:string]: number} = {}
        currWhere[`${this.#idName}`] = id
        return this.#model.findUnique({
            where: currWhere
        })
    }
    
    public update({...args}:T){

    }
    
    public deleteOne(id: number){

    }
}