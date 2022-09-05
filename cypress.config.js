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
    baseUrl: 'https://api.openweathermap.org/data/3.0/onecall'
  }
});
