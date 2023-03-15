import type { Roles, User, View } from "@prisma/client"
import { redirect } from "@sveltejs/kit"
import Service from "../../../services/service.class"
import { uRoles, type adminServerProps } from "../../../types/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user || locals.user.role !== uRoles.ADMIN) {
        throw redirect(302, '/')
      }
    let UserService = new Service<User>('user')
    let ViewService = new Service<View>('view')
    let users:User[] = await UserService.readBySkipAndTake(0, 8)
    users.sort((a, b) => a.username.localeCompare(b.username))
    let RoleService = new Service<Roles>('roles')
    let roles = await RoleService.readAll()
    let views = await ViewService.readAll()
    views = views.sort((a,b)=>a.viewId - b.viewId)
    return {
        users: users,
        roles: roles,
        views: views
    } as  adminServerProps
}
