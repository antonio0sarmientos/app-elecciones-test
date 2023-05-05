/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { createPinia } from 'pinia'
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'

export function registerPlugins (app) {
  loadFonts()

  const pinia = createPinia()

  app
    .use(pinia)
    .use(vuetify)
}
