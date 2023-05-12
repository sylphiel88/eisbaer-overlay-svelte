import type { Album, Artist, Prisma, PrismaClient, Roles, User, View } from "@prisma/client";

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

export type UserCredentials = {
    name: string
    role: uRoles
}

export enum uRoles {
    ADMIN = 'admin',
    USER = 'user',
    DJ = 'dj',
    ALL = 'all'
}

export interface adminServerProps {
    users: (User & {Role: Roles})[]
    roles: Roles[]
    views: View[]
}

export enum SvelteViewType {
    VIDEO = 'VIDEO',
    YOUTUBE= 'YOUTUBE',
    COMPONENT= 'COMPONENT',
    IMAGE ='IMAGE'
}

export type AuthToken = {
    access_token: string,
    expires_in: number
}

export interface SpotifyTrack {
    timestamp?:              number;
    context?:                Context;
    progress_ms:            number;
    item:                   Item;
    currently_playing_type?: string;
    actions?:                Actions;
    is_playing?:             boolean;
}

export interface Actions {
    disallows: Disallows;
}

export interface Disallows {
    resuming: boolean;
}

export interface Context {
    external_urls: ExternalUrls;
    href:          string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Item {
    album:             AlbumSpoti;
    artists:           ArtistSpoti[];
    available_markets?: string[];
    disc_number?:       number;
    duration_ms:       number;
    explicit?:          boolean;
    external_ids?:      ExternalIDS;
    external_urls?:     ExternalUrls;
    href?:              string;
    id?:                string;
    is_local?:          boolean;
    name:              string;
    popularity?:        number;
    preview_url?:       string;
    track_number?:      number;
    type?:              string;
    uri?:               string;
}

export interface AlbumSpoti {
    album_group?:            string;
    album_type?:             string;
    artists:                ArtistSpoti[];
    available_markets?:      string[];
    external_urls?:          ExternalUrls;
    href?:                   string;
    id?:                     string;
    images:                 Image[];
    is_playable?:            boolean;
    name:                   string;
    release_date?:           Date;
    release_date_precision?: string;
    total_tracks?:           number;
    type?:                   string;
    uri?:                    string;
}

export interface ArtistSpoti {
    external_urls?: ExternalUrls;
    href?:          string;
    id?:            string;
    name:          string;
    type?:          string;
    uri?:           string;
}

export interface Image {
    height?: number;
    url:    string;
    width?:  number;
}

export interface ExternalIDS {
    isrc: string;
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type VirtualDJSong = {
    active: string,
    artist: string,
    title: string,
    cover?: string
    currPos?: number,
    duration?: number,
    album?:string
}

export type VirtualDJ = {
    [key:string]: VirtualDJSong
}