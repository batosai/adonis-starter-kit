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
up.feedback.config.currentClasses.push(['active'])
up.feedback.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'

// override unpoly up-confirm, add custom modal
window.upConfirmCompiler = () => {
  up.compiler('[up-confirm]', function (element) {
    up.on(element, 'click', (event, element) => {
      event.preventDefault()
      up.confirm(element)
    })
  })
}
upConfirmCompiler()

up.confirm = function (element) {
  const message = element.getAttribute('up-confirm')
  const method = element.getAttribute('up-method') ?? 'GET'
  const colorButton = element.dataset.colorButton ?? 'btn-primary'

  const dialog = up.element.createFromHTML(`
    <div class="modal modal-open z-[2000]" x-data="{}" @keyup.escape.window="$el.remove()">
      <div class="modal-box">
          <h3 class="font-bold text-lg">${message}</h3>

          <div class="modal-action">
              <button @click="$root.remove()" class="btn btn-ghost">
                  cancel
              </button>

              <button class="btn ${colorButton}" @click="up.navigate({ target: 'main', url: '${element.getAttribute(
                'href'
              )}', method: '${method}' }); $root.remove()">
                  ok
              </button>
          </div>
      </div>
    </div>`)

  document.querySelector('body').append(dialog)
}
