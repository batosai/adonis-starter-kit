import 'unpoly/unpoly.css'
import '../css/app.css'

import Alpine from 'alpinejs'
import 'unpoly'

// Alpine
Alpine.start()

// Unpoly

if (document.querySelector('meta[name="mode"]')) {
  up.log.enable()
}

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.status.config.currentClasses.push(['menu-active'])
up.status.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'

// force redirect
// https://unpoly.com/up:fragment:loaded
up.on('up:fragment:loaded', (event) => {
  const location = event.response.header('X-Up-Location')
  const fullReload = event.response.header('X-Full-Reload')

  if (location) {
    event.preventDefault()
    window.location.href = location
    // up.navigate(location, { fail: true })
  }

  if (fullReload) {
    event.preventDefault()
    event.request.loadPage()
  }
})

// override unpoly up-confirm, add custom modal
up.compiler('[up-confirm]', function (el) {
  up.on(el, 'click', (event, element) => {
    event.preventDefault()
    up.confirm(element)
  })
})

up.confirm = function (element) {
  const href = element.getAttribute('href')
  const message = element.getAttribute('up-confirm')
  const layer = element.getAttribute('up-layer') ?? 'current'
  const target = element.getAttribute('up-target') ?? 'main'
  const method = element.getAttribute('up-method') ?? 'GET'
  const colorButton = element.dataset.colorButton ?? 'btn-primary'

  const dialog = up.element.createFromHTML(`
    <div class="modal modal-open z-2000" x-data="{}" @keyup.escape.window="$el.remove()">
      <div class="modal-box">
          <h3 class="font-bold text-lg">${message}</h3>

          <div class="modal-action">
              <button @click="$root.remove()" class="btn btn-ghost">
                  cancel
              </button>

              <button class="btn ${colorButton}" @click="up.navigate({ layer: '${layer}', target: '${target}', url: '${href}', method: '${method}' }); $root.remove()">
                  ok
              </button>
          </div>
      </div>
    </div>`)

  document.querySelector('body').append(dialog)
}
