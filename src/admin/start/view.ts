import edge from 'edge.js'

const BASE_URL = new URL('../', import.meta.url)

edge.mount('admin', new URL('resources/views', BASE_URL))
