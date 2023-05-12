import axios from 'axios';
import type { AuthToken, SpotifyTrack } from '../types/types';

export default class SpotifyAccess {
	#access: AuthToken | null = null;
	#currentSong: SpotifyTrack | undefined = undefined;
	#interval: NodeJS.Timer | null = null;
	#count: number = 0;
	#progress_ms = 0;
	#duration_ms = 0;

	private static instance: SpotifyAccess | null = null;

	private constructor() {
		this.getAccessToken();
	}

	get currentSong() {
		return this.#currentSong;
	}

	set interval(interval: null) {
		if (this.#interval !== null) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
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
				if (this.#access?.access_token) {
					this.#count += 1;
					if (this.#count % 4 === 0) {
						this.getNowPlaying();
					} else {
						this.progress_ms += 1000;
					}
				}
			}, 1000);
		} else {
			if(this.#interval !== null){
				clearInterval(this.#interval)
				this.#interval = null
			}
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
		if (this.#access?.access_token) {
			fetch('http://localhost:3000/api/spotify/getNowPlaying', {
				method: 'POST',
				body: JSON.stringify({
					access_token: this.#access?.access_token
				})
			}).then((res) =>
				res.json().then((jRes) => {
					this.currentSong = jRes;
				})
			);
		}
	}

	private getAccessToken() {
		axios.get('http://localhost:3000/api/spotify/getAuthToken').then((res: { data: AuthToken }) => {
			if (res.data.expires_in) {
				setTimeout(() => this.getAccessToken(), res.data.expires_in * 990);
			} else {
				setTimeout(() => this.getAccessToken(), 120000);
			}
			this.#access = res.data;
		});
	}

	public static getInstance() {
		if (SpotifyAccess.instance === null) {
			SpotifyAccess.instance = new SpotifyAccess();
		}
		return SpotifyAccess.instance;
	}
}
