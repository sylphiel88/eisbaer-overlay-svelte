import type { DeepPartial, SpotifyTrack, VirtualDJ } from "../types/types";

export default class VirtualDJAccess{
	#currentSong: DeepPartial<SpotifyTrack> | undefined = undefined;
	#interval: NodeJS.Timer | null = null;
	#count: number = 0;
	#progress_ms = 0;
	#duration_ms = 0;
    private static instance: VirtualDJAccess | null = null;

    private constructor(){}

    get currentSong(){
        return this.#currentSong
    }

    get progress_ms(){
        return this.#progress_ms
    }

    get duration_ms(){
        return this.#duration_ms
    }

    set interval(value:null){
        this.#interval = null
    }

    set useVirtualDJ(useVirtualDJ:boolean){
        if(useVirtualDJ){
            this.#interval = setInterval(()=>{
                this.#count++
                if(this.#count % 5 == 0){
                    fetch('/api/virtualdj').then(res=>res.json().then((jRes:VirtualDJ)=>{
                        let activeKey:string = Object.keys(jRes).find(k=>jRes[k].active === "true") as string
                        this.currentSong = {
                            progress_ms: jRes[activeKey].currPos! * 1000,
                            item:{
                                album:{
                                    name:jRes[activeKey].album,
                                    images:[
                                        {
                                            url:`data:image/png;base64, ${jRes[activeKey].cover}`
                                        }
                                    ]
                                },
                                artists:[{
                                    name: jRes[activeKey].artist,
                                }],
                                duration_ms: jRes[activeKey].duration! * 1000,
                                name: jRes[activeKey].title
                            }
                        }
                        this.#duration_ms = jRes[activeKey].duration! * 1000
                        this.progress_ms = jRes[activeKey].currPos! * 1000
                    }))
                } else {
                    this.progress_ms += 1000
                }
            },1000)
        } else {
            if(this.#interval !== null){
                clearInterval(this.#interval)
                this.#interval = null
            }
        }
    }

    private set currentSong(gotSong: DeepPartial<SpotifyTrack> | undefined) {
		if (gotSong !== undefined) {
            this.#currentSong = gotSong
			let event = new CustomEvent('settitle', {
				detail: {
					currentSong: this.#currentSong
				}
			});
			document.dispatchEvent(event);
		}
	}

	private set progress_ms(ms: number) {
		this.#progress_ms = ms;
		let event: CustomEvent = new CustomEvent('setprogress');
		document.dispatchEvent(event);
	}

    static getInstance(){
        if(this.instance === null){
            this.instance = new VirtualDJAccess()
        }
        return this.instance
    }
}