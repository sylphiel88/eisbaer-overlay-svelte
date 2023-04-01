import type { View } from '@prisma/client';
import { uRoles } from '../../types/types';
import Service from '../../services/Service.class';
import type { LayoutServerLoad } from './$types';
import { env } from 'process';
import DBClient from '../../db/prismaClient';
import ViewService from '../../services/ViewService.class';

export const load: LayoutServerLoad = async ({ locals }) => {
    let client_id:string = ""
    let viewService = new ViewService()
    let user
    let views:View[] = []
    let hasRefreshToken = false
    views = await viewService.readAll()
    if(locals.user){
        user = locals.user
        if(locals.user.role !== uRoles.ADMIN){
            views = views.filter(view=>!view.allowOnlyAdmin)
        }
        let foundUser = await DBClient.getInstance().prisma.user.findUnique({
            where:{
                username: user.name
            }
        })
        hasRefreshToken = foundUser?.refreshtoken !== null
        client_id = env["Client_ID"] as string
    } else {
        views = views.filter(view=>view.allowForEveryOne)
    }
    views = views.sort((a, b) => a.viewId - b.viewId)
    return {
        user: user,
        views: views,
        client_id: client_id,
        hasRefreshToken: hasRefreshToken
    }
};
