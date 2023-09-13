import "dotenv/config";

import { anotherTestFunction } from "./src/services/another-test-service.js";
import { testFunction } from "./src/services/test-service.js";

testFunction("Hello world from ts-node");
console.log(anotherTestFunction());
console.log(process.env["MY_ENV_VAR"]);
