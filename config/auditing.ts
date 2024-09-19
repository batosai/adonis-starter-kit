import { defineConfig } from '@stouder-io/adonis-auditing'

export default defineConfig({
  userResolver: () => import('#core/audit_resolvers/user_resolver'),
  resolvers: {
    user_fullname: () => import('#core/audit_resolvers/user_fullname_revolver'),
    ip_address: () => import('#core/audit_resolvers/ip_address_resolver'),
    user_agent: () => import('#core/audit_resolvers/user_agent_resolver'),
    url: () => import('#core/audit_resolvers/url_resolver'),
  },
})
