import adonisPrettierConfig from "@adonisjs/prettier-config" with { type: 'json' }

export default {
  ...adonisPrettierConfig,
  plugins: [ "@trivago/prettier-plugin-sort-imports" ],
  importOrder: ["^@/(.*)$", "^#(.*)$", "^[./]" ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true
}
