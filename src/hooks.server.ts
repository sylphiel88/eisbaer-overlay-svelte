import type { Handle } from '@sveltejs/kit'
import CurrViewStore from '../src/Store'
import type { uRoles } from '../src/types/types'
import DBClient from './db/prismaClient'

const db = DBClient.getInstance().prisma

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')

  if (!session) {
    return await resolve(event)
  }

  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, Role: true },
  })

  if (user) {
    CurrViewStore.set(user.username)
    event.locals["user"] = {
      name: user.username,
      role: user.Role.name as uRoles,
    }
  }
  return await resolve(event)
}