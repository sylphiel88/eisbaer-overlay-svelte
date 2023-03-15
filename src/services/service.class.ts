import { Prisma } from "@prisma/client";
import DBClient from "../db/prismaClient";
import type { GenericModel, Models, ModelTypes } from "../types/types";

export default class Service<T> {

    private static prisma = DBClient.getInstance().prisma
    
    #model: GenericModel & T
    #idName: String|undefined

    #getModel<SpecificModelName extends Models>(
        modelName: SpecificModelName,
    ): GenericModel & T {
        return Service.prisma[modelName] as GenericModel & T;
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

    public async create({...args}:T):Promise<T[]> {
        //@ts-ignore
        await this.#model.create({data:{
            ...args
        }})
        return this.readAll()
    }

    public async readAll():Promise<T[]> {
        let result = this.#model.findMany({}) as Promise<T[]>
        return result
    }

    public async readOne(id: number):Promise<T> {
        let currWhere:{[key:string]: number} = {}
        currWhere[`${this.#idName}`] = id
        let result = this.#model.findUnique({
            where: currWhere
        }) as unknown as Promise<T>
        return result
    }

    public async readBySkipAndTake(skip: number, take:number):Promise<any>{
        let result = this.#model.findMany({
            skip: skip,
            take: take,
            include: {
                Role: true
            }
        })
        return result
    }
    
    public async update({...arg}){
        let idn = this.#idName as string
        let id = arg[idn]
        let currWhere:{[key:string]: number} = {}
        currWhere[`${this.#idName}`] = id
        await this.#model.update({
            where: currWhere,
            data: {...arg}
        })
        return this.readAll()
    }
    
    public async deleteOne(id: number){
        let currWhere:{[key:string]: number} = {}
        currWhere[`${this.#idName}`] = id
        await this.#model.delete({
            where: currWhere
        })
        return this.readAll()
    }
}