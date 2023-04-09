import { fail, redirect } from '@sveltejs/kit'
import { default as bcrypt } from 'bcrypt'
import { uRoles } from '../../../types/types'
import DBClient from '../../../db/prismaClient'
import type { Action, Actions, PageServerLoad } from './$types'

const db = DBClient.getInstance().prisma

export const load: PageServerLoad = async () => {
  // todo
}

const register: Action = async ({ request }) => {
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

  const user = await db.user.findUnique({
    where: { username },
  })

  if (user) {
    return fail(400, { user: true })
  }

  const pinHash = await bcrypt.hash(pin, 10)
  const userAuthToken = crypto.randomUUID()

  await db.user.create({
    data: {
      username,
      pin: pinHash,
      userAuthToken: userAuthToken,
      Role: { connect: { name: uRoles.USER } },
    },
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { register }