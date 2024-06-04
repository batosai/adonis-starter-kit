// vite.config.ts
import adonisjs from "file:///home/jerem/D%C3%A9veloppements/adonis-starter-kit/node_modules/@adonisjs/vite/build/src/client/main.js";
import { defineConfig } from "file:///home/jerem/D%C3%A9veloppements/adonis-starter-kit/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["src/core/resources/css/app.css", "src/core/resources/js/app.js"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["src/**/resources/views/**/*.edge", "src/**/resources/css/**/*.css", "src/**/resources/js/**/*.js"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qZXJlbS9EXHUwMEU5dmVsb3BwZW1lbnRzL2Fkb25pcy1zdGFydGVyLWtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamVyZW0vRFx1MDBFOXZlbG9wcGVtZW50cy9hZG9uaXMtc3RhcnRlci1raXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamVyZW0vRCVDMyVBOXZlbG9wcGVtZW50cy9hZG9uaXMtc3RhcnRlci1raXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGFkb25pc2pzKHtcbiAgICAgIC8qKlxuICAgICAgICogRW50cnlwb2ludHMgb2YgeW91ciBhcHBsaWNhdGlvbi4gRWFjaCBlbnRyeXBvaW50IHdpbGxcbiAgICAgICAqIHJlc3VsdCBpbiBhIHNlcGFyYXRlIGJ1bmRsZS5cbiAgICAgICAqL1xuICAgICAgZW50cnlwb2ludHM6IFsnc3JjL2NvcmUvcmVzb3VyY2VzL2Nzcy9hcHAuY3NzJywgJ3NyYy9jb3JlL3Jlc291cmNlcy9qcy9hcHAuanMnXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQYXRocyB0byB3YXRjaCBhbmQgcmVsb2FkIHRoZSBicm93c2VyIG9uIGZpbGUgY2hhbmdlXG4gICAgICAgKi9cbiAgICAgIHJlbG9hZDogWydzcmMvKiovcmVzb3VyY2VzL3ZpZXdzLyoqLyouZWRnZScsICdzcmMvKiovcmVzb3VyY2VzL2Nzcy8qKi8qLmNzcycsICdzcmMvKiovcmVzb3VyY2VzL2pzLyoqLyouanMnXSxcbiAgICB9KSxcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThULE9BQU8sY0FBYztBQUNuVixTQUFTLG9CQUFvQjtBQUU3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtQLGFBQWEsQ0FBQyxrQ0FBa0MsOEJBQThCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLOUUsUUFBUSxDQUFDLG9DQUFvQyxpQ0FBaUMsNkJBQTZCO0FBQUEsSUFDN0csQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
