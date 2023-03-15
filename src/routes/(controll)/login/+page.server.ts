import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import DBClient from '../../../db/prismaClient'
import type { Action, Actions, PageServerLoad } from './$types'

const db = DBClient.getInstance().prisma

export const load: PageServerLoad = async ({locals}) => {
    if (locals.user) {
        throw redirect(302, '/')
      }
}

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const pin = [data.get('pinfield0'), data.get('pinfield1'),data.get('pinfield2'),data.get('pinfield3'),data.get('pinfield4'), data.get('pinfield5')].join('')
  if (
    typeof username !== 'string' ||
    typeof pin !== 'string' ||
    !username ||
    !pin
  ) {
    return fail(400, { invalid: true })
  }

  const user = await db.user.findUnique({ where: { username } })

  if (!user || !user.isPermited) {
    return fail(400, { credentials: true })
  }

  const userPassword = await bcrypt.compare(pin, user.pin)

  if (!userPassword) {
    return fail(400, { credentials: true })
  }

  // generate new auth token just in case
  const authenticatedUser = await db.user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('session', authenticatedUser.userAuthToken!, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  })
  throw redirect(302, '/')
}

export const actions: Actions = { login }