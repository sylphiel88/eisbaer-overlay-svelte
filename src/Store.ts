import { writable } from "svelte/store";

const defaultValue = ""

export const CurrViewStore = writable<string>(defaultValue)

export default CurrViewStore