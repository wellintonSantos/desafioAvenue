const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'osxhtw',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.amazon.com.br'
  },
  api: {
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: '29ac25f5b96eb62fa368bb9245d2d5b7'
  }
});
