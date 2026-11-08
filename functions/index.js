const {setGlobalOptions} = require("firebase-functions");

// Limit the maximum number of function instances.
setGlobalOptions({maxInstances: 10});
