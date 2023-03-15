import type { View } from '@prisma/client';
import { uRoles } from '../../../types/types';
import Service from '../../../services/service.class';
import type { PageServerLoad } from './$types';
import DBClient from '../../../db/prismaClient';

export const load: PageServerLoad = async ({ locals }) => {
    let ViewService = new Service<View>('view')
    let user
    let views:View[] = []
    let hasRefreshToken = false
    views = await ViewService.readAll()
    if(locals.user){
        user = locals.user
        let foundUser = await DBClient.getInstance().prisma.user.findUnique({
            where:{
                username: user.name
            }
        })
        hasRefreshToken = foundUser?.refreshtoken !== null
        if(locals.user.role !== uRoles.ADMIN){
            views = views.filter(view=>!view.allowOnlyAdmin)
        }
    } else {
        views = views.filter(view=>view.allowForEveryOne)
    }
    views = views.sort((a, b) => a.viewId - b.viewId)
    return {
        user: user,
        views: views,
        hasRefreshToken: hasRefreshToken
    }
};