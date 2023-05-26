import { redirect } from "@sveltejs/kit"
import { uRoles } from "../../../types/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user || locals.user.role !== uRoles.ADMIN) {
        throw redirect(302, '/')
    }
}