import db from '@adonisjs/lucid/services/db'
import { DbCheck } from '@adonisjs/lucid/database'
import { HealthChecks, DiskSpaceCheck, MemoryHeapCheck } from '@adonisjs/core/health'

export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck(),
  new MemoryHeapCheck(),
  new DbCheck(db.connection()),
])
