module.exports = {
    "reporters": [
      "default",
      ["jest-stare", {
        "resultDir": "results",
        "reportTitle": "Test Report",
        "additionalResultsProcessors": ["jest-junit"],
        "coverageLink": "coverage/lcov-report/index.html",
        "jestStareConfigJson": "jest-stare.json",
        "jestGlobalConfigJson": "globalStuff.json"
      }]
    ]
  }