// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: UserCredentials
            currView: number
		}
	}
}

export type UserCredentials = {
    name: string
    role: uRoles
}

enum uRoles {
    ADMIN = 'admin',
    USER = 'user',
    DJ = 'dj'
}

export {};
