import type { Roles, User, View } from "@prisma/client"
import { redirect } from "@sveltejs/kit"
import { uRoles, type adminServerProps } from "../../../types/types"
import type { PageServerLoad } from "./$types"
import UserService from "../../../services/UserService.class"
import ViewService from "../../../services/ViewService.class"
import RoleService from "../../../services/RoleService.class"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user || locals.user.role !== uRoles.ADMIN) {
        throw redirect(302, '/')
      }
    let userService = new UserService()
    let viewService = new ViewService()
    let users:User[] = await userService.readBySkipAndTake(0, 8)
    users.sort((a, b) => a.username.localeCompare(b.username))
    let roleService = new RoleService()
    let roles = await roleService.readAll()
    let views = await viewService.readAll()
    views = views.sort((a,b)=>a.viewId - b.viewId)
    return {
        users: users,
        roles: roles,
        views: views
    } as  adminServerProps
}
