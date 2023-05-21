// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

interface CustomEventMap {
    "settitle": CustomEvent;
    "setprogress": CustomEvent;
}

declare global {
	namespace App {
		interface Locals {
			user: UserCredentials
            currView: number
		}
	}
    interface Document { //adds definition to Document, but you can do the same with HTMLElement
        addEventListener<K extends keyof CustomEventMap>(type: K,
           listener: (this: Document, ev: CustomEventMap[K]) => void): void;
        dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
    }
}

export type UserCredentials = {
    name: string
    role: uRoles
}

enum uRoles {
    ADMIN = 'admin',
    DJ = 'dj',
    USER = 'user',
    ALL = 'all'
}

export {};
