import { writable } from 'svelte/store'

export const store = writable({
    toc: null,
    currentPage: null
});