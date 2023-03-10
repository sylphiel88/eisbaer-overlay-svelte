import Jimp from 'jimp'
import * as fs from 'fs'
import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async({url}:RequestEvent) => {
    let fontSize = url.searchParams.get('fontsize')
    let image = await Jimp.read('/usr/src/app/static/djplan.jpg')
    var fontFileName = fs.readdirSync(`/usr/src/app/static/eisb${fontSize}/`).find(file=>file.endsWith('.fnt'));
    if(fontFileName !== undefined){
        let font = await Jimp.loadFont(`/usr/src/app/static/eisb${fontSize}/${fontFileName}`)
        image.print(font, 200, 600, "Hallo, Manu!")
        var file = "/usr/src/app/static/preview." + image.getExtension();
        image.write(file)
    }
    return new Response("Hallo")
}