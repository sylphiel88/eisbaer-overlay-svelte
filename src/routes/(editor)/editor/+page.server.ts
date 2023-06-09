import { redirect } from "@sveltejs/kit"
import { uRoles } from "../../../types/types"
import type { PageServerLoad } from "./$types"
import EventService from "../../../services/EventService.class"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user || locals.user.role !== uRoles.ADMIN) {
        throw redirect(302, '/')
    }
    let date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1
    }
}