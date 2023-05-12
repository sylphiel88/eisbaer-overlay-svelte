export const GET = async () => {
    try{
        let info = await fetch('http://host.docker.internal:5000/')
        console.log(info)
        let infoDict = await info.json()
        console.log(infoDict)
        return new Response(JSON.stringify(infoDict))
    } catch(e){
        console.log(e)
    }
	return new Response();
};