const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server.js");

// Missing Routes
test("Missing routes", async () => {
  const app = server.listen(3000);
  const response = await fetch("http://localhost:3000/err");
  app.close();

  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /^<h1>Route Not Found<\/h1>$/);
});
