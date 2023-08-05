import axios from 'axios';
import type { AuthToken, SpotifyTrack } from '../types/types';
import socketIo, {type Socket} from 'socket.io-client'

export default class SpotifyAccess {
	#access: AuthToken | null = null;
	#currentSong: SpotifyTrack | undefined = undefined;
	#interval: NodeJS.Timer | null = null;
	#count: number = 0;
	#progress_ms = 0;
	#duration_ms = 0;
	#io:Socket|null = null
	private static readonly ENDPOINT = 'http://localhost:2001'

	private static instance: SpotifyAccess | null = null;

	private constructor() {
		this.#io = socketIo(SpotifyAccess.ENDPOINT)
		this.#io.on('setCurrentSong', (song:SpotifyTrack)=>{
			this.currentSong = song
		})
	}

	get currentSong() {
		return this.#currentSong;
	}

	get authToken(){
		console.log(this.#access)
		return this.#access
	}

	set interval(interval: null) {
		if (this.#interval !== null) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
	}

	get io(){
		return this.#io
	}

	private set currentSong(gotSong: SpotifyTrack | undefined) {
		if (gotSong !== undefined) {
			this.#currentSong = gotSong;
			this.progress_ms = gotSong.progress_ms;
			this.#duration_ms = gotSong.item.duration_ms;
			let event = new CustomEvent('settitle', {
				detail: {
					currentSong: this.#currentSong
				}
			});
			document.dispatchEvent(event);
		}
	}

	private set progress_ms(ms: number) {
		let event: CustomEvent = new CustomEvent('setprogress');
		document.dispatchEvent(event);
		this.#progress_ms = ms;
	}

	get progress_ms() {
		return this.#progress_ms;
	}

	get duration_ms() {
		return this.#duration_ms;
	}

	set useSpotify(useSpotify: boolean) {
		if (this.#interval !== null) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
		if (useSpotify) {
			this.getNowPlaying();
			this.#interval = setInterval(() => {
					this.#count += 1;
					if (this.#count % 4 === 0) {
						this.getNowPlaying();
					} else {
						this.progress_ms += 1000;
					}
				}, 1000)
			this.#count = 0;
			this.currentSong = {
				is_playing: true,
				item: {
					album: {
						name: 'Eisbär Esslingen',
						images: [
							{
								url: 'http://localhost:3000/platte.png'
							}
						],
						artists: [
							{
								name: 'Eisbär Esslingen'
							}
						]
					},
					name: 'Eisbär Esslingen',
					artists: [
						{
							name: 'Herzlich Willkommen im'
						}
					],
					duration_ms: 817000
				},
				progress_ms: 260000
			};
		}
	}

	private getNowPlaying() {
		fetch('http://localhost:3000/api/spotify/getUser').then(res=>res.json().then(async jRes=>{
			console.log('user', jRes)
			this.#io?.emit('setSpotify', jRes, false)
			this.#io?.emit('getNowPlaying')
		}))
	}

	public static getInstance() {
		if (SpotifyAccess.instance === null) {
			SpotifyAccess.instance = new SpotifyAccess();
		}
		return SpotifyAccess.instance;
	}

	public resetSong(){
		this.#interval = null
		this.#currentSong = undefined;
	}
}
