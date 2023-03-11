import type { Album, Artist, Prisma, PrismaClient, User } from "@prisma/client";

export type Models = keyof Omit<PrismaClient,'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'>

export type GenericModel = Prisma.UserDelegate<any>;

export type IgnorePrismaBuiltins<PrismaClientKeyUnionGeneric extends string> =
string extends PrismaClientKeyUnionGeneric
    ? string
    : PrismaClientKeyUnionGeneric extends ''
    ? PrismaClientKeyUnionGeneric
    : PrismaClientKeyUnionGeneric extends `$${string}`
    ? never
    : PrismaClientKeyUnionGeneric;

export type ModelName = IgnorePrismaBuiltins<keyof typeof PrismaClient>;

export type ModelTypes = User|Artist|Album