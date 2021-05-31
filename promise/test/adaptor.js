var promisesAplusTests = require("promises-aplus-tests");
const adapter = require("./A+")
promisesAplusTests(adapter, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
    console.log(err)
});