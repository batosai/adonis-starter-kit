import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

const HealthChecksController = () => import('#core/controllers/health_checks_controller')

router.get('/health', [HealthChecksController])
